// Configuração do Google Forms
const FORM_ID = '1FAIpQLSf5vWwPwyK4d9_odsTnYLNotlNQ_tu_m0qzXk_OR2q_Jc6Yng';
const FORM_URL = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`;

// IDs dos campos do formulário
const FIELDS = {
  nomeIgreja: 'entry.294222580',
  finalizacao: 'entry.2026570381'
};

/**
 * Envia o nome da igreja para o Google Forms
 * Chamado quando o usuário cadastra/atualiza o nome da igreja
 */
export const enviarNomeIgreja = async (nomeIgreja: string): Promise<void> => {
  if (!nomeIgreja || nomeIgreja.trim() === '') return;

  const formData = new URLSearchParams();
  formData.append(FIELDS.nomeIgreja, nomeIgreja);

  try {
    await fetch(FORM_URL, {
      method: 'POST',
      mode: 'no-cors', // Importante para CORS
      body: formData
    });
  } catch (error) {
    console.error('❌ Erro ao enviar nome da igreja:', error);
    // Não bloqueia a aplicação se falhar
  }
};

/**
 * Envia registro de finalização da comissão
 * Chamado quando o usuário finaliza a comissão
 */
export const enviarFinalizacaoComissao = async (
  nomeIgreja: string,
  duracaoSegundos: number
): Promise<void> => {
  if (!nomeIgreja || nomeIgreja.trim() === '') return;

  // Formatar duração para texto legível
  const horas = Math.floor(duracaoSegundos / 3600);
  const minutos = Math.floor((duracaoSegundos % 3600) / 60);
  const segundos = duracaoSegundos % 60;
  
  const duracaoFormatada = horas > 0 
    ? `${horas}h ${minutos}min ${segundos}s`
    : `${minutos}min ${segundos}s`;

  const mensagem = `${nomeIgreja} - Duração: ${duracaoFormatada} (${duracaoSegundos}s)`;

  const formData = new URLSearchParams();
  formData.append(FIELDS.finalizacao, mensagem);

  try {
    await fetch(FORM_URL, {
      method: 'POST',
      mode: 'no-cors', // Importante para CORS
      body: formData
    });
  } catch (error) {
    console.error('❌ Erro ao enviar finalização:', error);
    // Não bloqueia a aplicação se falhar
  }
};

