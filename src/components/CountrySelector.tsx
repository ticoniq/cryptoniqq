import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ReactCountryFlag from "react-country-flag";
import { countries, ICountry } from 'countries-list';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";

interface CountryOption {
  code: string;
  name: string;
}

interface CountrySelectorProps {
  selectedCountries?: string[];
  placeholder?: string;
  label?: string;
  name: string;
}

export const CountrySelector: React.FC<CountrySelectorProps> = ({
  selectedCountries = Object.keys(countries),
  placeholder = "Select a country",
  label,
  name
}) => {
  const form = useFormContext();
  const countryList: CountryOption[] = selectedCountries.map(code => ({
    code,
    name: (countries as Record<string, ICountry>)[code].name,
  }));

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent className="h-52">
                {countryList.map((country) => (
                  <SelectItem key={country.name} value={country.name}>
                    <div className="flex items-center">
                      <ReactCountryFlag
                        countryCode={country.code}
                        svg
                        style={{
                          width: '1.5em',
                          height: '1.5em',
                          marginRight: '0.5em'
                        }}
                      />
                      {country.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};