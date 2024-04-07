"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface MediaFilterGenreFormProps {
  items: { id: string; label: string; checked?: boolean }[];
  onSubmit: (value: string[]) => void;
}

const FormSchema = z.object({
  items: z.array(z.string()),
});

export function MediaFilterGenreForm({
  items,
  onSubmit,
}: MediaFilterGenreFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: [],
    },
  });

  function onFormSubmit(data: z.infer<typeof FormSchema>) {
    onSubmit(data.items);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
              <div>
                <FormLabel className="text-base">Genres</FormLabel>
              </div>
              <div className={"grid grid-cols-2 gap-y-2"}>
                {items.map((item: { id: string; label: string; checked?: boolean }) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="items"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={
                                item?.checked || field.value?.includes(item.id)
                              }
                              onCheckedChange={(checked) => {
                                item.checked = !!checked;
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id,
                                      ),
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className={"w-full"} type="submit">
          Valider
        </Button>
      </form>
    </Form>
  );
}
