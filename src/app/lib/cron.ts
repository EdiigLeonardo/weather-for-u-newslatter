import cron from 'node-cron';

// Agenda uma tarefa para rodar todos os dias às 8h
const cronJob: any = async () => await cron.schedule('0 8 * * *', async () => {
    // `
    /**
     * Faz uma requisição para a API route `/api/weather-alert.
     * @param  - Sem parametros.
     * @returns - Não retorna nada. Só loga a mensagem da resposta.
     */
    console.log('Verificando previsão do tempo e enviando e-mails...');

    try {
        const response: Response = await fetch('/api/weather-alert', { method: 'POST' });
        const data: { message: string } = await response.json();
        return (`Email Enviado com sucesso! ${data.message}`);
    } catch (error) {
        console.error('Erro ao verificar previsão do tempo e enviar e-mails.', error);
        return (`Erro, teve o seguinte erro: ${error}`);
    }
});

export default cronJob;