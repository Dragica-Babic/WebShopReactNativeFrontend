import { Popup } from "react-native-windows";

const ModalComponent=({visible, component})=>{
    const Component=component;
    return(
        <Popup isOpen={visible}>
            <Component />
        </Popup>
    )
}

export default ModalComponent;