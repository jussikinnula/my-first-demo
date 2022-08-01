const waitForMouseMove = (): Promise<void> => {
  return new Promise((resolve) => {
    function ready() {
      document.body.removeEventListener('mousemove', ready);
      setTimeout(resolve, 1000);
    }

    document.body.addEventListener('mousemove', ready);
  });
};

export default waitForMouseMove;
