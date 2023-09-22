import { useState } from "react";

const PAGE_CONTROL = {
    MAIN: 'main',
    CREATE: 'create',
    EDIT: 'edit',
    DELETE: 'delete'
}

export function useCategoryControlHook({
    categories
}) {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const [pageControl, setPageControl] = useState(PAGE_CONTROL.MAIN);
    const [inputValue, setInputValue] = useState(null);

    const handleChangePage = (value) => {
        setPageControl(value)
    }

    const handleChangePageToMain = () => {
        setInputValue(null);
        setSelectedCategory(null);
        setPageControl(PAGE_CONTROL.MAIN)
    }

    const handleChangeInputValue = (e) => {
        let value = e.target.value;
        setInputValue(value);
    }

    const handleChangeSelectedCategory = (e) => {
        let categoryId = e.target.value;
        if(!categoryId) {
            setSelectedCategory(null);
            setInputValue(null);
            return;
        }
        let value = categories?.find(category => category.id === categoryId)
        setSelectedCategory(value);
        setInputValue(value.name);
    }

    const checkFormat = (body) => {
        let name = body.name;

        if(categories.some(category => category.name === name)) {
            throw new Error("이미 등록된 카테고리입니다.")
        }

        if(!name || name.trim() === '') {
            throw new Error("카테고리명을 정확하게 입력해주세요.");
        }
    }

    return {
        categories,
        selectedCategory,
        pageControl,
        inputValue,
        handleChangePage,
        handleChangePageToMain,
        handleChangeInputValue,
        handleChangeSelectedCategory,
        checkFormat
    }   
}