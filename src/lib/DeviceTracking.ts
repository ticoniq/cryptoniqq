import { headers } from 'next/headers';
import UAParser from 'ua-parser-js';
import prisma from "@/lib/prisma";

interface DeviceTrackingResult {
  device: {
    id: string;
    name: string;
    os: string;
    type: string;
  };
  isNewDevice: boolean;
}

export async function handleDeviceTracking(userId: string, sessionId: string): Promise<DeviceTrackingResult> {
  try {
    const userAgent = headers().get("user-agent") || '';
    const uaParser = new UAParser(userAgent);
    const deviceInfo = uaParser.getResult();

    const browserName = deviceInfo.browser.name || 'Unknown Browser';
    const osName = deviceInfo.os.name || 'Unknown OS';
    const deviceType = deviceInfo.device.type || 'desktop';

    let device = await prisma.device.findFirst({
      where: {
        userId: userId,
        name: browserName,
        os: osName,
      },
    });

    let isNewDevice = false;

    if (!device) {
      device = await prisma.device.create({
        data: {
          userId: userId,
          name: browserName,
          os: osName,
          type: deviceType,
        },
      });
      isNewDevice = true;
    } else {
      device = await prisma.device.update({
        where: { id: device.id },
        data: { lastUsedAt: new Date() },
      });
    }

    await prisma.session.update({
      where: { id: sessionId },
      data: { deviceId: device.id },
    });

    return {
      device: {
        id: device.id,
        name: device.name,
        os: device.os,
        type: device.type,
      },
      isNewDevice,
    };
  } catch (error) {
    throw new Error("Failed to handle device tracking");
  }
}