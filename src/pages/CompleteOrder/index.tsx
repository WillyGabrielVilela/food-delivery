import { CompleteOrderForm } from "./components/CompleteOrderForm";
import { SelectedFoods } from "./components/SelectedFoods";
import { CompleteOrderContainer } from "./styles";
import { useForm, FormProvider } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCart } from "../../hooks/useCart";
import { useNavigate } from "react-router-dom";

const confirmOrderFormValidationSchema = zod.object({
  cep: zod.string().min(1, "Informe o CEP"),
  street: zod.string().min(1, "Informe a Rua"),
  number: zod.string().min(1, "Informe o Número"),
  complement: zod.string().optional(),
  district: zod.string().min(1, "Informe o Bairro"),
  city: zod.string().min(1, "Informe a Cidade"),
  uf: zod.string().min(1, "Informe a UF"),
  paymentMethod: zod.enum(["Crédito", "Débito", "Dinheiro"], {
    errorMap: () => ({ message: "Informe o método de pagamento" }),
  }),
});

export type OrderData = zod.infer<typeof confirmOrderFormValidationSchema>;

type ConfirmOrderFormData = OrderData;

export function CompleteOrderPage() {
  const confirmOrderForm = useForm<ConfirmOrderFormData>({
    resolver: zodResolver(confirmOrderFormValidationSchema),
    defaultValues: {
      paymentMethod: undefined, // Garantir que o valor inicial seja válido
    },
  });

  const { handleSubmit } = confirmOrderForm;
  const { cartItems, cleanCart } = useCart();
  const navigate = useNavigate();

  function handleConfirmOrder(data: ConfirmOrderFormData) {
    const telefoneHamburgueria = "5581999262639"; // Substitua pelo número do WhatsApp

    let mensagem = `*Novo Pedido!*\n\n📍 *Endereço de Entrega:*\n`;
    mensagem += `- CEP: ${data.cep}\n`;
    mensagem += `- Rua: ${data.street}, Número: ${data.number}\n`;
    if (data.complement) mensagem += `- Complemento: ${data.complement}\n`;
    mensagem += `- Bairro: ${data.district}\n`;
    mensagem += `- Cidade: ${data.city} - ${data.uf}\n\n`;

    mensagem += `🛒 *Itens do Pedido:*\n`;
    cartItems.forEach((item) => {
      mensagem += `- ${item.name} x${item.quantity} - R$${item.price * item.quantity}\n`;
    });

    mensagem += `\n💳 *Forma de Pagamento:* ${data.paymentMethod}\n`;
    mensagem += `\n💰 *Total: R$${cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )}*\n`;

    const url = `https://wa.me/${telefoneHamburgueria}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");

    // Enviar os dados para a página de confirmação
    navigate("/orderconfirmed", { state: { ...data, cartItems } });

    cleanCart();
  }

  return (
    <FormProvider {...confirmOrderForm}>
      <CompleteOrderContainer className="container" onSubmit={handleSubmit(handleConfirmOrder)}>
        <CompleteOrderForm />
        <SelectedFoods />
      </CompleteOrderContainer>
    </FormProvider>
  );
}
