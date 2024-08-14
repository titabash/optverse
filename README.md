# Application-boilerplate

## Description

This is a boilerplate application for Flutter and Supabase, with a Prisma backend and a Docker setup.

## Requirements

Ensure the following are installed:

- Docker
- Prisma
- Node.js (npm)
- Supabase

## Setup

To set up the project environment, follow these steps:

1. **Ensure Make is Available**:
   Ensure that the `make` command is available on your system. If not, you will need to install it. For most Unix-based systems, `make` is available by default.

2. **Initialize the Project**:
   Run the following command to initialize the project:

```bash
make init
```

This command will install any necessary software that is not already present on your system.

3. **Database Setup**:
   After setting up the project, you need to run the migration command to apply the initial changes to the database. Run the following command:

```bash
make migration
```

## Execution

After successfully completing the setup, you can start the application using the following command:

```bash
make local
```

If the application starts up without any issues, the setup is complete.

# Tips

The following tools are being considered for implementation

## [Resend](https://resend.com/)

- Email delivery tool

## [Sentry](https://sentry.io/welcome/)

- Application Monitoring software

## [Stripe](https://stripe.com/jp)

- Online payment platform

## [RevenueCat](https://www.revenuecat.com/)

- Application subscription payment platform
