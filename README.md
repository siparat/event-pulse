# 🚀 EventPulse

Высоконагруженная экосистема для бронирования билетов на мероприятия.

## 🔗 Ресурсы проекта
| Ресурс | Ссылка | Инструмент |
| :--- | :--- | :--- |
| **Архитектура** | [Miro Board](https://miro.com/app/board/uXjVGYNrg20=/?share_link_id=827689415624) | Miro (Event Storming) |

## 🛠️ Технологический стек

### Core
- **Monorepo:** Nx
- **Languages:** TypeScript
- **Backend:** NestJS (Node.js)
- **Validation:** Zod

### Architecture Patterns
- **DDD** (Domain-Driven Design)
- **CQRS** (Command Query Responsibility Segregation)
- **Event-Driven Architecture** (EDA)

### Data & Infrastructure
- **ORM:** Prisma
- **Databases:** PostgreSQL, Redis
- **Messaging:** RabbitMQ
- **API Documentation:** Swagger (OpenAPI)

### DevOps & Observability
- **Containerization:** Docker
- **Orchestration:** Kubernetes
- **Monitoring:** Prometheus & Grafana
- **CI/CD:** GitHub Actions

## 🏗️ Микросервисы (Contexts)
- **Inventory**: Учет площадок, событий и управление сеткой мест.
- **Sales**: Оформление заказов, работа с платежами ЮKassa.
- **Access**: Жизненный цикл билетов и контроль доступа (QR-коды).

