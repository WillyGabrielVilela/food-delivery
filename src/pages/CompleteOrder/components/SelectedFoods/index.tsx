import { TitleText } from "../../../../components/Typography";
import { useCart } from "../../../../hooks/useCart";
import { FoodCartCard } from "../FoodCartCard";
import { ConfirmationSection } from "./ConfirmationSection";
import { DetailsContainer, SelectedFoodsContainer } from "./styles";

export function SelectedFoods() {
    const { cartItems } = useCart();
    return (
        <SelectedFoodsContainer>
            <TitleText size="xs" color="subtitle">
                Itens selecionados
            </TitleText>

            <DetailsContainer>
                {cartItems.map((item) => (
                    <FoodCartCard key={item.id} food={item} />
                    
                ))}
                <ConfirmationSection />
            </DetailsContainer>
        </SelectedFoodsContainer>
    )
}