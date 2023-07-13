import { useState } from "react";

export default function useOptionGeneratorFormHook(props) {
    const [seperator, setSeperator] = useState('');
    const [optionValues, setOptionValues] = useState([
        {
            value: ''
        }
    ]);

    const onChangeSeperator = (e) => {
        let value = e.target.value;

        setSeperator(value);
    }

    const onChangeOptionValue = (e, index) => {
        let value = e.target.value;

        setOptionValues(optionValues.map((r, rIndex) => {
            if (rIndex === index) {
                return {
                    ...r,
                    value: value
                }
            } else {
                return {
                    ...r
                }
            }
        }))
    }

    const onActionPushOptionValue = () => {
        if(optionValues.length >= 3){
            return;
        }

        setOptionValues([
            ...optionValues,
            {
                value: ''
            }
        ])
    }

    const onActionDeleteOptionValue = (index) => {
        if(optionValues.length <= 1){
            return;
        }

        let newData = optionValues.filter((r, rIndex) => rIndex !== index);
        setOptionValues(newData);
    }


    return {
        seperator,
        optionValues,
        onChangeSeperator,
        onChangeOptionValue,
        onActionPushOptionValue,
        onActionDeleteOptionValue
    }
}