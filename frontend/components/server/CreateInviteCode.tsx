import React from 'react';
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from '../ui/combobox';

type CreateInviteCodeProps = {
    setExpireAfter: (value: string) => void;
    setMaxUses: (value: string) => void;
};

type Option = {
    label: string;
    value: string;
};

const EXPIRE_AFTER_OPTIONS: Option[] = [
    { value: '7', label: '7 days' },
    { value: '30', label: '30 days' },
    { value: '90', label: '90 days' },
    { value: 'never', label: 'Never' },
];

const MAX_USES_OPTIONS: Option[] = [
    { value: 'No Limit', label: 'No Limit' },
    { value: '1', label: '1 use' },
    { value: '5', label: '5 uses' },
    { value: '10', label: '10 uses' },
];

function CreateInviteCode({ setExpireAfter, setMaxUses }: CreateInviteCodeProps) {

    const [selectedExpireAfter, setSelectedExpireAfter] = React.useState<Option>(EXPIRE_AFTER_OPTIONS[0]);
    const [selectedMaxUses, setSelectedMaxUses] = React.useState<Option>(MAX_USES_OPTIONS[0]);

    return (
        <div>
            <main className="flex flex-col gap-5 items-start justify-center">
                <div className='flex flex-col gap-2 w-full'>
                    <label htmlFor="serverName" className="text-[15px] font-bold">Expire After</label>
                    <Combobox
                        items={EXPIRE_AFTER_OPTIONS}
                        value={selectedExpireAfter}
                        onValueChange={(value) => {
                            if (!value) return;
                            const nextValue = value as Option;
                            setSelectedExpireAfter(nextValue);
                            setExpireAfter(nextValue.value);
                        }}
                        itemToStringValue={(item) => (item as Option).label}
                    >
                        <ComboboxInput className='w-full' placeholder="Select expire after" />
                        <ComboboxContent>
                            <ComboboxEmpty>No items found.</ComboboxEmpty>
                            <ComboboxList>
                                {(option: Option) => (
                                    <ComboboxItem key={option.value} value={option}>
                                        {option.label}
                                    </ComboboxItem>
                                )}
                            </ComboboxList>
                        </ComboboxContent>
                    </Combobox>
                </div>

                <div className='flex flex-col gap-2 w-full'>
                    <label htmlFor="serverName" className="text-[15px] font-bold">Max Number of Uses</label>
                    <Combobox
                        items={MAX_USES_OPTIONS}
                        value={selectedMaxUses}
                        onValueChange={(value) => {
                            if (!value) return;
                            const nextValue = value as Option;
                            setSelectedMaxUses(nextValue);
                            setMaxUses(nextValue.value);
                        }}
                        itemToStringValue={(item) => (item as Option).label}
                    >
                        <ComboboxInput className='w-full' placeholder="Select max uses" />
                        <ComboboxContent>
                            <ComboboxEmpty>No items found.</ComboboxEmpty>
                            <ComboboxList>
                                {(option: Option) => (
                                    <ComboboxItem key={option.value} value={option}>
                                        {option.label}
                                    </ComboboxItem>
                                )}
                            </ComboboxList>
                        </ComboboxContent>
                    </Combobox>
                </div>
            </main>
        </div>
    );
}

export default CreateInviteCode;