import Stack from "react-bootstrap/esm/Stack";
import { useShoppingCart } from "../context/CartContext";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { CartItem } from "./CartItem";
import { FormatCurrency } from "../utilities/FormatCurrency";
import storeItems from "../data/items.json";

type ShoppingCartProps = {
    isOpen: boolean
}

export function ShoppingCart({ isOpen }: ShoppingCartProps) {

    const { closeCart, cartItems } = useShoppingCart();

    return <>
        <Offcanvas 
            show={isOpen} 
            onHide={closeCart} 
            //className="bg-red-400 text-white"
            placement="end"
            
        >
            <Offcanvas.Header className="bg-red-100 text-white-100" closeButton>
                <Offcanvas.Title>Your Cart</Offcanvas.Title>                
            </Offcanvas.Header>
            <Offcanvas.Body>                

                <Stack gap={3}>
                    {
                        cartItems.map(item=>(
                            <CartItem key={item.id} {...item}/>
                        ))
                    }
                    
                    <div className="ms-auto fw-bold fs-5">
                        Total{" "}
                        {
                            FormatCurrency(
                                cartItems.reduce((total, cartItem) => {
                                    const item = storeItems.find(i => i.id === cartItem.id);
                                    
                                    return total + (item?.price || 0) * cartItem.quantity
                                }, 0)
                            )
                        }
                    </div>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    </>

}  