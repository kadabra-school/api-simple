const uuidv4 = require("uuid/v4");

module.exports = (app) => {
  var customerWalletsDB = app.data.customerWallets;
  var controller = {};

  var { customerWallets: customerWalletsMock } = customerWalletsDB;

  controller.listCustomerWallets = (req, res) =>
    res.status(200).json(customerWalletsDB);

  controller.saveCustomerWallets = (req, res) => {
    customerWalletsMock.data.push({
      id: uuidv4(),
      parentId: uuidv4(),
      name: req.body.name,
      birthDate: req.body.birthDate,
      cellphone: req.body.cellphone,
      phone: req.body.phone,
      email: req.body.email,
      occupation: req.body.occupation,
      state: req.body.state,
    });

    res.status(201).json(customerWalletsMock);
  };

  controller.removeCustomerWallets = (req, res) => {
    var { customerId } = req.params;

    var foundCustomerIndex = customerWalletsMock.data.findIndex(
      (customer) => customer.id === customerId
    );

    if (foundCustomerIndex === -1) {
      res.status(404).json({
        message: "Cliente não encontrado na base.",
        success: false,
        customerWallets: customerWalletsMock,
      });
    } else {
      customerWalletsMock.data.splice(foundCustomerIndex, 1);
      res.status(200).json({
        message: "Cliente encontrado e deletado com sucesso!",
        success: true,
        customerWallets: customerWalletsMock,
      });
    }
  };

  controller.updateCustomerWallets = (req, res) => {
    var { customerId } = req.params;

    var foundCustomerIndex = customerWalletsMock.data.findIndex(
      (customer) => customer.id === customerId
    );

    if (foundCustomerIndex === -1) {
      res.status(404).json({
        message: "Cliente não encontrado na base.",
        success: false,
        customerWallets: customerWalletsMock,
      });
    } else {
      var newCustomer = {
        id: customerId,
        parentId: req.body.parentId,
        name: req.body.name,
        birthDate: req.body.birthDate,
        cellphone: req.body.cellphone,
        phone: req.body.phone,
        email: req.body.email,
        occupation: req.body.occupation,
        state: req.body.state,
        createdAt: new Date(),
      };

      customerWalletsMock.data.splice(foundCustomerIndex, 1, newCustomer);

      res.status(200).json({
        message: "Cliente encontrado e atualizado com sucesso!",
        success: true,
        customerWallets: customerWalletsMock,
      });
    }
  };

  controller.getCustomerWallets = (req, res) => {
    const { customerId } = req.params;

    var customer;

    for (const customerData of customerWalletsMock.data) {
      if (customerData.id === customerId) {
        customer = customerData;
      }
    }

    if (!customer) {
      res.status(404).json({
        message: "Cliente não encontrado na base.",
        success: false,
        customerWallets: customerWalletsMock,
      });
    } else {
      res.status(200).json({
        message: "Cliente encontrado e atualizado com sucesso!",
        success: true,
        customerWallets: customer,
      });
    }

  return controller;
};
