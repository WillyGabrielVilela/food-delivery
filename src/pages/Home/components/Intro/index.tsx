import {
  BenefitsContainer,
  IntroContainer,
  IntroContent,
  IntroTitle,
} from "./styles";
import introImg from "../../../../assets/intro-img.png";
import { ShoppingCart, Package, Timer, ForkKnife } from "phosphor-react";
import { useTheme } from "styled-components";
import { RegularText } from "../../../../components/Typography";
import { InfoWithIcon } from "../../../../components/InfoWithIcon";

export function Intro() {
  const { colors } = useTheme();

  return (
    <IntroContainer>
      <IntroContent className="container">
        <div>
          <section>
            <IntroTitle size="xl">
              Sabores inigualáveis
            </IntroTitle>
            <RegularText as="h3" size="l" color="subtitle">
              Sinta o cuidado do preparo com ingredientes selecionados
            </RegularText>
          </section>

          <BenefitsContainer>
            <InfoWithIcon
              iconBg={colors["brand-yellow-dark"]}
              icon={<ShoppingCart weight="fill" />}
              text="Compra simples e segura"
            />
            <InfoWithIcon
              iconBg={colors["brand-yellow-dark"]}
              icon={<Package weight="fill" />}
              text="Embalagem mantém a refeição intacta"
            />
            <InfoWithIcon
              iconBg={colors["brand-yellow"]}
              icon={<Timer weight="fill" />}
              text="Entrega rápida e rastreada"
            />
            <InfoWithIcon
              iconBg={colors["brand-purple"]}
              icon={<ForkKnife weight="fill" />}
              text="A refeição chega fresquinha até você"
            />
          </BenefitsContainer>
        </div>

        <img src={introImg} width="450px" />
      </IntroContent>
    </IntroContainer>
  );
}