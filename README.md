# Certification Process

![alt text](https://github.com/alphapoint/frontend_workshop/blob/master/mock_up.png)

## Requirements

As the final part of certification, please have your team submit a PR to our [shared github repository](https://github.com/alphapoint/frontend_workshop) on their organization specific branch which demonstrates the following:

- Login and Logout
- Upon Login, show the following interface
- Upon logout, hide the interface
- The instrument selector should change the global state (the ticker, the orderbook, and the recent trades)
- The Order Entry should be able to submit a buy or sell limit order
- The Balances should show your balances
- I should be able to submit a deposit and withdraw ticket
  - Deposit Fiat:
    - GetDepositTemplateTypes
    - GetDepositRequestInfoTemplate
    - CreateDepositTicket
    - GetDepositTickets
  - Deposit Crypto:
    - GetDepositRequestInfoTemplate
    - GetDepositInfo
  - Withdraw Fiat:
    - GetWithdrawFormTemplateTypes
    - GetWithdrawTemplateTypes
    - GetWithdrawTemplate
    - CreateWithdrawTicket
    - GetWithdrawTickets
  - Withdraw Crypto:
    - GetWithdrawFormTemplateTypes
    - GetWithdrawTemplateTypes
    - GetWithdrawTemplate
    - CreateWithdrawTicket
    - GetWithdrawTickets
- Each component should be able to update in real time based on events received on the websocket.

The main goal, is to show facility with the API, and the tools provided. It should implement the following components in their most simple basic form.

My estimation is that this should take no more than 1 hour per person (8 hours total). Styling doesn't matter. This is purely a demonstration of API knowledge.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
