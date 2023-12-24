import { Modal } from "react-native";

const ModalComponent=({visible, component})=>{
    const Component=component;
    return(
        <Modal transparent visible={visible}>
            <Component />
        </Modal>
    )
}

export default ModalComponent;