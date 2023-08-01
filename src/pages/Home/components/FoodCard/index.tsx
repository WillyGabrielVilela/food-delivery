import { AddCartWrapper, CardFooter, FoodCardContainer, Description, Name, Tags } from "./styles";
import { RegularText, TitleText } from "../../../../components/Typography";
import { QuantityInput } from "../../../../components/QuantityInput";
import { ShoppingCart } from "phosphor-react";
import { formatMoney } from "../../../../utils/formatMoney";
import { useCart } from "../../../../hooks/useCart";
import { useState } from "react";

export interface Food {
    id: number;
    tags: string[];
    name: string;
    description: string;
    photo: string;
    price: number;
}

interface FoodProps {
    food: Food;
}


export function FoodCard({ food }: FoodProps) {
    const [quantity, setQuantity] = useState(1);

    function handleIncrease() {
        setQuantity((state) => state + 1);
    }
    function handleDecrease() {
        setQuantity((state) => state - 1);
    }

    const { addFoodToCart } = useCart();

    function handleAddToCart() {
        const foodToAdd = {
            ...food,
            quantity,
        }

        addFoodToCart(foodToAdd)
    }

    const formattedPrice = formatMoney(food.price)
    return (
        <FoodCardContainer>
            <img src={`/foods/${food.photo}`} />
            <Tags>
                {food.tags.map((tag) => (
                    <span key={`${food.id}${tag}`}>{tag}</span>
                ))}
            </Tags>

            <Name>{food.name}</Name>
            <Description>{food.description}</Description>
            <CardFooter>
                <div>
                    <RegularText size="s">R$</RegularText>
                    <TitleText size="m" color="text" as="strong">
                        {formattedPrice}
                    </TitleText>
                </div>

                <AddCartWrapper>
                    <QuantityInput
                        onIncrease={handleIncrease}
                        onDecrease={handleDecrease}
                        quantity={quantity}
                    />
                    <button onClick={handleAddToCart}>
                        <ShoppingCart size={22} weight="fill" />
                    </button>
                </AddCartWrapper>
            </CardFooter>
        </FoodCardContainer>
    )
}