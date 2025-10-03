import { useState } from 'react';
import {
  BookOpen,
  Settings,
  UserPlus,
  Vote,
  Users,
  CheckCircle,
  ChevronRight,
  Heart,
  Database,
  AlertCircle,
  Church
} from 'lucide-react';

interface SecaoAjuda {
  id: string;
  titulo: string;
  icone: React.ElementType;
  cor: string;
  conteudo: {
    topico: string;
    descricao: string;
  }[];
}

const Ajuda = () => {
  const [secoesLidas, setSecoesLidas] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('ajudaSecoesLidas');
    return new Set(saved ? JSON.parse(saved) : []);
  });

  const [secaoExpandida, setSecaoExpandida] = useState<string | null>(null);

  const secoes: SecaoAjuda[] = [
    {
      id: 'configuracao',
      titulo: 'Configuração da Comissão',
      icone: Settings,
      cor: 'blue',
      conteudo: [
        {
          topico: 'Nome da Igreja',
          descricao: 'Informe o nome da sua igreja no campo obrigatório. Este nome aparecerá nos relatórios gerados.'
        },
        {
          topico: 'Seleção de Ministérios',
          descricao: 'Marque os ministérios que serão votados na comissão. Use os botões "Selecionar Todos" ou "Limpar Seleção" para agilizar.'
        },
        {
          topico: 'Departamentos Personalizados',
          descricao: 'Adicione ministérios ou departamentos específicos da sua igreja que não estão na lista padrão. Informe nome, descrição e número de vagas.'
        },
        {
          topico: 'Iniciar Comissão',
          descricao: 'Após configurar, clique em "Iniciar Comissão" para começar o processo de votação. O cronômetro geral será iniciado automaticamente.'
        }
      ]
    },
    {
      id: 'pre-cadastro',
      titulo: 'Pré-Cadastro de Liderança',
      icone: Users,
      cor: 'purple',
      conteudo: [
        {
          topico: 'Liderança Atual',
          descricao: 'Para cada ministério, você pode cadastrar o diretor atual e diretor associado (quando aplicável). Estes nomes aparecerão como sugestões destacadas na etapa de indicação.'
        },
        {
          topico: 'Possíveis Interessados',
          descricao: 'Liste nomes de pessoas que demonstraram interesse em servir no ministério. Adicione quantos nomes desejar usando o botão "+".'
        },
        {
          topico: 'Configuração de Vagas',
          descricao: 'Para Ancionato, Diáconos e Diaconisas, defina o número de vagas disponíveis. Os demais ministérios têm vagas pré-definidas.'
        }
      ]
    },
    {
      id: 'indicacao',
      titulo: 'Processo de Indicação',
      icone: UserPlus,
      cor: 'green',
      conteudo: [
        {
          topico: 'Explicação do Ministério',
          descricao: 'Ao selecionar um ministério, será exibido um modal com descrição, responsabilidades e número de vagas. Leia atentamente antes de iniciar as indicações.'
        },
        {
          topico: 'Adicionando Candidatos',
          descricao: 'Digite o nome do candidato (3 a 100 caracteres) e clique em "Adicionar". O sistema não permite nomes duplicados.'
        },
        {
          topico: 'Sugestões Inteligentes',
          descricao: 'O sistema mostra sugestões em 3 categorias: Liderança Atual (azul com coroa), Possíveis Interessados (roxo), e Histórico de Votações (cinza). Clique para adicionar rapidamente.'
        },
        {
          topico: 'Encerrar sem Candidatos',
          descricao: 'Se não houver nomes para indicar, use o botão amarelo "Encerrar sem candidatos". O ministério será marcado e poderá ser reaberto depois.'
        },
        {
          topico: 'Validação',
          descricao: 'Ao tentar avançar, o sistema alertará se o número de candidatos for diferente do número de vagas, mas você pode prosseguir se desejar.'
        }
      ]
    },
    {
      id: 'votacao',
      titulo: 'Votação dos Candidatos',
      icone: Vote,
      cor: 'yellow',
      conteudo: [
        {
          topico: 'Adicionando Votos',
          descricao: 'Clique no botão "+1 Voto" ao lado do nome do candidato. O sistema atualiza o ranking em tempo real conforme os votos são registrados.'
        },
        {
          topico: 'Acompanhamento',
          descricao: 'Veja o contador de votos, porcentagens e posição de cada candidato. O líder aparece destacado em amarelo.'
        },
        {
          topico: 'Desfazer Ações',
          descricao: 'Use "Desfazer último voto" para remover o voto mais recente, ou "Zerar votos" para resetar um candidato específico.'
        },
        {
          topico: 'Pausar/Retomar',
          descricao: 'Pause a votação a qualquer momento. O cronômetro para e os botões de voto ficam desabilitados até retomar.'
        },
        {
          topico: 'Finalizar Votação',
          descricao: 'Clique em "Finalizar Votação" quando concluir. Uma confirmação será solicitada mostrando o resumo dos resultados.'
        }
      ]
    },
    {
      id: 'casos-especiais',
      titulo: 'Ministérios Especiais',
      icone: AlertCircle,
      cor: 'orange',
      conteudo: [
        {
          topico: 'Desbravadores e Aventureiros',
          descricao: 'Possuem 3 vagas fixas: 1 Diretor e 2 Diretores Associados. Vote primeiro para o diretor, depois para os associados.'
        },
        {
          topico: 'Ancionato',
          descricao: 'Número de vagas configurável na etapa de configuração. Processo de votação normal para todas as vagas.'
        },
        {
          topico: 'Diáconos e Diaconisas',
          descricao: 'Ministérios separados com vagas configuráveis (padrão: 15 vagas cada). Siga o fluxo normal de indicação e votação.'
        },
        {
          topico: 'Ministérios sem Candidatos',
          descricao: 'Aparecem com badge laranja no seletor. Clique em "Reabrir" para reiniciar o processo de indicação a qualquer momento.'
        }
      ]
    },
    {
      id: 'persistencia',
      titulo: 'Salvamento Automático',
      icone: Database,
      cor: 'indigo',
      conteudo: [
        {
          topico: 'LocalStorage',
          descricao: 'Todo o progresso (configurações, candidatos, votos, resultados) é salvo automaticamente no navegador.'
        },
        {
          topico: 'Retomar Sessão',
          descricao: 'Feche e reabra o navegador: seu progresso estará intacto. O botão mudará para "Retomar Comissão" se houver dados salvos.'
        },
        {
          topico: 'Limpar Dados',
          descricao: 'Use o botão vermelho "Limpar Dados" na página principal para resetar todo o sistema e começar uma nova comissão.'
        },
        {
          topico: 'Relatórios',
          descricao: 'Gere PDFs dos resultados a qualquer momento. Os relatórios incluem nome da igreja, candidatos, votos e vencedores.'
        }
      ]
    },
    {
      id: 'doacoes',
      titulo: 'Apoio ao Projeto',
      icone: Heart,
      cor: 'pink',
      conteudo: [
        {
          topico: 'Botão Flutuante',
          descricao: 'No canto inferior direito, há um botão "Apoiar" sempre visível em todas as páginas.'
        },
        {
          topico: 'Como Doar',
          descricao: 'Clique no botão para ver as opções de doação via PIX ou outros métodos. Sua contribuição ajuda a manter o projeto gratuito.'
        },
        {
          topico: 'Código Aberto',
          descricao: 'O sistema é de código aberto. Você também pode contribuir dando uma estrela no GitHub ou reportando melhorias.'
        }
      ]
    }
  ];

  const marcarComoLida = (secaoId: string) => {
    const novasSecoes = new Set(secoesLidas);
    novasSecoes.add(secaoId);
    setSecoesLidas(novasSecoes);
    localStorage.setItem('ajudaSecoesLidas', JSON.stringify([...novasSecoes]));
  };

  const toggleSecao = (secaoId: string) => {
    if (secaoExpandida === secaoId) {
      setSecaoExpandida(null);
    } else {
      setSecaoExpandida(secaoId);
      marcarComoLida(secaoId);
    }
  };

  const getCor = (cor: string) => {
    const cores: Record<string, { bg: string; border: string; icon: string; badge: string }> = {
      blue: { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'text-blue-600', badge: 'bg-blue-600' },
      purple: { bg: 'bg-purple-50', border: 'border-purple-200', icon: 'text-purple-600', badge: 'bg-purple-600' },
      green: { bg: 'bg-green-50', border: 'border-green-200', icon: 'text-green-600', badge: 'bg-green-600' },
      yellow: { bg: 'bg-yellow-50', border: 'border-yellow-200', icon: 'text-yellow-600', badge: 'bg-yellow-600' },
      orange: { bg: 'bg-orange-50', border: 'border-orange-200', icon: 'text-orange-600', badge: 'bg-orange-600' },
      indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200', icon: 'text-indigo-600', badge: 'bg-indigo-600' },
      pink: { bg: 'bg-pink-50', border: 'border-pink-200', icon: 'text-pink-600', badge: 'bg-pink-600' },
    };
    return cores[cor] || cores.blue;
  };

  const progressoPercentual = Math.round((secoesLidas.size / secoes.length) * 100);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg p-6 md:p-8 mb-6 text-white">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center">
                <BookOpen size={32} />
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Centro de Ajuda</h1>
              <p className="text-blue-100 text-sm md:text-base mb-4">
                Aprenda a usar o sistema de votação passo a passo. Todas as informações necessárias para conduzir sua comissão com sucesso.
              </p>

              {/* Barra de Progresso */}
              <div className="bg-white/20 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-white h-full transition-all duration-500 rounded-full flex items-center justify-end pr-2"
                  style={{ width: `${progressoPercentual}%` }}
                >
                  {progressoPercentual > 10 && (
                    <span className="text-xs font-bold text-blue-600">{progressoPercentual}%</span>
                  )}
                </div>
              </div>
              <p className="text-xs text-blue-100 mt-2">
                {secoesLidas.size} de {secoes.length} seções concluídas
              </p>
            </div>
          </div>
        </div>


        {/* Grid de Seções - 1 Coluna */}
        <div className="space-y-4">
          {secoes.map((secao, index) => {
            const Icone = secao.icone;
            const cores = getCor(secao.cor);
            const foiLida = secoesLidas.has(secao.id);
            const estaExpandida = secaoExpandida === secao.id;

            return (
              <div
                key={secao.id}
                className={`bg-white rounded-lg shadow-md border-2 ${estaExpandida ? cores.border : 'border-gray-200'} transition-all hover:shadow-lg`}
              >
                {/* Header do Card */}
                <button
                  onClick={() => toggleSecao(secao.id)}
                  className="w-full p-4 md:p-6 flex items-center gap-4 text-left"
                >
                  {/* Numeração do Passo */}
                  <div className={`flex-shrink-0 w-10 h-10 ${cores.badge} text-white rounded-full flex items-center justify-center font-bold text-lg`}>
                    {index + 1}º
                  </div>

                  <div className={`flex-shrink-0 w-12 h-12 ${cores.bg} rounded-lg flex items-center justify-center`}>
                    <Icone className={cores.icon} size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-1">{secao.titulo}</h3>
                    <p className="text-xs md:text-sm text-gray-500">
                      {secao.conteudo.length} tópicos · Passo {index + 1} de {secoes.length}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {foiLida && (
                      <CheckCircle className="text-green-500" size={24} />
                    )}
                    <ChevronRight
                      className={`text-gray-400 transition-transform ${estaExpandida ? 'rotate-90' : ''}`}
                      size={24}
                    />
                  </div>
                </button>

                {/* Conteúdo Expandido */}
                {estaExpandida && (
                  <div className="px-4 md:px-6 pb-4 md:pb-6 border-t border-gray-100">
                    <div className="space-y-4 mt-4">
                      {secao.conteudo.map((item, idx) => (
                        <div key={idx} className={`${cores.bg} border ${cores.border} rounded-lg p-4`}>
                          <div className="flex items-start gap-3">
                            <div className={`w-6 h-6 ${cores.badge} text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5`}>
                              {idx + 1}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-800 mb-1 text-sm md:text-base">
                                {item.topico}
                              </h4>
                              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                                {item.descricao}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Botão de Conclusão */}
                    {!foiLida && (
                      <button
                        onClick={() => marcarComoLida(secao.id)}
                        className={`mt-4 w-full py-2 ${cores.badge} hover:opacity-90 text-white font-semibold rounded-lg transition text-sm`}
                      >
                        Marcar como concluída ✓
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer de Ajuda */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
          <div className="flex items-start gap-4">
            <Church className="text-blue-600 flex-shrink-0" size={32} />
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Precisa de mais ajuda?</h3>
              <p className="text-sm text-gray-600 mb-3">
                Se tiver dúvidas ou sugestões de melhoria, entre em contato:
              </p>
              <a
                href="mailto:marloncastro78@gmail.com"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition text-sm"
              >
                marloncastro78@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ajuda;

