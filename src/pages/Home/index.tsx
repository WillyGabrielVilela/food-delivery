import { Intro } from "./components/Intro";
import { OurFoods } from "./components/OurFoods";
import { HomeContainer } from "./styles";

export function HomePage() {
    
    return (
        <HomeContainer>

            <Intro />
            <OurFoods />
        </HomeContainer>
    )
}