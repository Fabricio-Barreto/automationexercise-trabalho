# AutomationExercise - testes E2E

## Objetivo

A suíte `automationexercise` usa Cypress para validar, de ponta a ponta, os
principais fluxos de uso do site [Automation Exercise](https://automationexercise.com).
Os testes interagem com a aplicação no navegador e verificam os resultados
visíveis, como mensagens de confirmação, dados de produtos e mudanças de página.

## Cenários cobertos

Os testes estão em `cypress/e2e/automationexercise/` e cobrem:

| Arquivo | Objetivo |
| --- | --- |
| `01-register-user.cy.js` | Cadastrar um usuário, confirmar a criação da conta e excluí-la ao final. |
| `02-login-user-with-correct-email-and-password.cy.js` | Fazer login com credenciais válidas e confirmar a identificação do usuário na sessão. |
| `03-login-user-with-incorrect-email-and-password.cy.js` | Verificar a mensagem exibida quando o login usa credenciais inválidas. |
| `04-logout-user.cy.js` | Fazer login, encerrar a sessão e confirmar o retorno à página de login. |
| `05-register-user-with-existing-email.cy.js` | Verificar que o sistema rejeita o cadastro com um e-mail já registrado. |
| `08-verify-all-products-and-product-detail-page.cy.js` | Acessar a lista de produtos e validar as informações da página de detalhes de um produto. |
| `09-search-product.cy.js` | Pesquisar produtos e verificar que os resultados correspondentes são exibidos. |
| `10-verify-subscription-in-home-page.cy.js` | Inscrever um e-mail na newsletter pela página inicial e validar a confirmação. |
| `15-place-order-register-while-checkout.cy.js` | Cadastrar uma conta durante o fluxo de compra, concluir um pedido e excluir a conta criada. |
| `16-place-order-register-before-checkout.cy.js` | Usar uma conta cadastrada antes do checkout, fazer login, concluir uma compra e remover a conta de teste. |

Os fluxos que precisam de usuário usam contas de teste com e-mails gerados
dinamicamente. Nos cenários que compartilham o helper
`cypress/support/test-account-lifecycle.js`, a conta é preparada antes do teste
e excluída depois, inclusive para reduzir resíduos entre execuções.

## Executar os testes

Instale as dependências:

```bash
npm install
```

Para executar somente a suíte `automationexercise` em modo headless:

```bash
npx cypress run --spec "cypress/e2e/automationexercise/**/*.cy.js"
```

Para abrir o Cypress interativamente:

```bash
npx cypress open
```

O comando `npm test` executa todos os testes Cypress do projeto, incluindo os
exemplos em `cypress/e2e/1-getting-started/` e
`cypress/e2e/2-advanced-examples/`, além de `automationexercise`.

## Relatório

O Cypress está configurado com o Mochawesome. Após uma execução bem-sucedida,
o relatório HTML é gerado em `cypress/reports/index.html`. Para que ele
represente todos os testes do projeto, execute:

```bash
npm test
```

O relatório corresponde aos testes incluídos naquela execução. A pasta de
relatórios é ignorada pelo Git e pode ser recriada a cada nova execução.

## Observações

- É necessário acesso à internet para executar os cenários, pois eles acessam
  `automationexercise.com`.
- Os testes de cadastro e compra criam e excluem contas na aplicação. Como a
  suíte interage com um site externo, a execução depende da disponibilidade e
  do comportamento atual desse serviço.
