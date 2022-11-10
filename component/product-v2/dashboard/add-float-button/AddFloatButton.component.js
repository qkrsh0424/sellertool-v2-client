import Image from "next/image";
import { useState } from "react";
import SingleBlockButton from "../../../modules/button/SingleBlockButton";
import CommonModalComponent from "../../../modules/modal/CommonModalComponent";
import AddModalComponent from "./modal/AddModal.component";
import { Container } from "./styles/AddFloatButton.styled";

export default function AddFloatButtonComponent(props) {
    const [addModalOpen, setAddModalOpen] = useState(false);

    const __handle = {
        action: {
            openAddModal: () => {
                setAddModalOpen(true);
            },
            closeAddModal: () => {
                setAddModalOpen(false);
            }
        }
    }
    return (
        <>
            <Container>
                <SingleBlockButton
                    type='button'
                    className='float-button'
                    onClick={() => __handle.action.openAddModal()}
                >
                    <div
                        className='icon-figure'
                    >
                        <Image
                            loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                            src='/images/icon/add_default_ffffff.svg'
                            layout='responsive'
                            width={1}
                            height={1}
                            objectFit={'cover'}
                            alt='image'
                            loading='lazy'
                        ></Image>
                    </div>
                </SingleBlockButton>
            </Container>

            <CommonModalComponent
                open={addModalOpen}

                onClose={__handle.action.closeAddModal}
            >
                <AddModalComponent
                    onClose={__handle.action.closeAddModal}
                />
            </CommonModalComponent>
        </>
    );
}