/**
 * @type {import('@storybook/test-runner').TestRunnerConfig}
 */
module.exports = {
  // Tags para incluir ou excluir testes
  // tags: {
  //   include: ['test'],
  //   exclude: ['docsOnly'],
  // },
  
  // Timeout personalizado para testes
  async preVisit(page) {
    // Configurações antes de visitar cada história
    await page.setViewportSize({ width: 1280, height: 720 });
  },
  
  async postVisit(page, context) {
    // Verificações após visitar cada história
    const elementHandler = await page.$('[data-sb-kind]');
    if (elementHandler) {
      await elementHandler.dispose();
    }
  },
};