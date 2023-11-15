const UtilsControllers = {
  consultaCEP: async (req, res) => {
    const cep = req.params.cep;
    try {
      const response = await fetch(`http://viacep.com.br/ws/${cep}/json`, {
        method: "GET",
      });
      // Aguardar a resolução da promessa retornada por response.json()
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  },
};

export default UtilsControllers;
