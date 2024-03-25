import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {FilterIcon} from "lucide-react";
import {ScrollArea} from "@/components/ui/scroll-area";
import {CheckboxReactHookFormMultiple} from "@/components/movies-filter-form";
import React from "react";
import {Genre} from "@/types/api-response";

interface MoviesFilterSheetProps {
    filteredGenres: string[]
    setFilteredGenres: (value: string[]) => void
    genres?: Genre[]
}

export const MoviesFilterSheet = ({
    filteredGenres,
    setFilteredGenres,
    genres
                                  }: MoviesFilterSheetProps) => {
    const [open, setOpen] = React.useState(false)

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className={'hidden md:flex'}>
                    <FilterIcon className="h-4 w-4" />
                </Button>
            </SheetTrigger>
            <SheetTrigger asChild>
                <Button variant="outline" className={'w-full gap-2 md:hidden'}>
                    <FilterIcon className="h-4 w-4" /> Filter
                </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                    <div className="flex flex-col space-y-3">
                        { genres && genres.length !== 0 &&
                            <CheckboxReactHookFormMultiple
                                items={genres.map(it => ({ id: it.id.toString(), label: it.name, checked: filteredGenres.includes(it.id.toString()) }))}
                                onSubmit={(value) => {
                                    console.log(value)
                                    setFilteredGenres(value);
                                }}
                            />
                        }
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}
