# Bad Smells Identificados - ReportGenerator

## 1. Long Method (Método Longo)

**Problema:** O método `generateReport()` tem 58 linhas e faz muitas responsabilidades.

**Localização:** Método principal da classe ReportGenerator

**Por que é um problema:**

- Difícil de entender
- Difícil de testar
- Viola o Single Responsibility Principle

**Solução sugerida:** Quebrar em métodos menores (Extract Method)

---

## 2. Duplicated Code (Código Duplicado)

**Problema:** Lógica repetida para formatação CSV/HTML entre usuários ADMIN e USER.

**Localização:** Linhas que formatam itens para CSV e HTML

**Por que é um problema:**

- Aumenta manutenção
- Risco de inconsistência
- Viola o DRY (Don't Repeat Yourself)

**Solução sugerida:** Extrair métodos comuns para formatação

---

## 3. Conditional Complexity (Complexidade Condicional)

**Problema:** Múltiplos níveis de if/else aninhados (até 3 níveis).

**Localização:** Loop principal que processa os itens

**Por que é um problema:**

- Alta complexidade ciclomática
- Difícil de seguir a lógica
- Propenso a bugs

**Solução sugerida:**

- Strategy Pattern para tipos de relatório
- Template Method para lógica comum
- Extract Class para tipos de usuário

---

## Resumo

Esses bad smells tornam o código:

- Difícil de manter
- Difícil de testar
- Difícil de estender com novos recursos
- Propenso a bugs

**Próximos passos:** Aplicar refatorações para melhorar a qualidade do código.