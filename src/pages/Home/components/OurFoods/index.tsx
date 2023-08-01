import { TitleText } from "../../../../components/Typography";
import { FoodCard } from "../FoodCard";
import { foods } from "../../../../data/foods";
import { FoodList, OurFoodsContainer } from "./styles";

export function OurFoods() {
  return (
    <OurFoodsContainer className="container">
      <TitleText size="l" color="subtitle">
        Nosso cardápio
      </TitleText>

      <FoodList>
        {foods.map((food) => (
          <FoodCard key={food.id} food={food} />
        ))}
      
      </FoodList>
    </OurFoodsContainer>
  );
}