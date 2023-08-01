import { ActionsContainer, FoodCartCardContainer, RemoveButton } from "./styles";
import { RegularText } from "../../../../components/Typography";
import { QuantityInput } from "../../../../components/QuantityInput";
import { Trash } from "phosphor-react";
import { formatMoney } from "../../../../utils/formatMoney";
import { CartItem } from "../../../../contexts/CartContext";
import { useCart } from "../../../../hooks/useCart";

interface FoodCartCardProps {
    food: CartItem;
}

export function FoodCartCard({ food }: FoodCartCardProps) {
    const { changeCartItemQuantity, removeCartItem } = useCart();

    function handleIncrease() {
        changeCartItemQuantity(food.id, "increase")
    }
    function handleDecrease() {
        changeCartItemQuantity(food.id, "decrease")
    }
    function handleRemove() {
        removeCartItem(food.id)
    }



    const foodTotal = food.price * food.quantity;

    const formattedPrice = formatMoney(foodTotal);
    return (
        <FoodCartCardContainer>
            <div>
                <img src={`/foods/${food.photo}`} alt="" />
                <div>
                    <RegularText color="subtitle">{food.name}</RegularText>
                    <ActionsContainer>
                        <QuantityInput 
                        size="small" 
                        onIncrease={handleIncrease}
                        onDecrease={handleDecrease}
                        quantity={food.quantity} />
                        <RemoveButton onClick={handleRemove}>
                            <Trash size={16} />
                            REMOVER
                        </RemoveButton>
                    </ActionsContainer>
                </div>
            </div>
            <p>R$ {formattedPrice}</p>
        </FoodCartCardContainer>
    )
}