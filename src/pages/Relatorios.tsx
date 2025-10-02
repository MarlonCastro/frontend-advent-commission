import { useState } from 'react';
import { Trophy, Users, Download, FileText, Target } from 'lucide-react';
import { useVotacao } from '../contexts/VotacaoContext';
import { gerarRelatorioCompleto, gerarRelatorioObjetivo } from '../utils/gerarPDF';

const Relatorios = () => {
  const { resultados, nomeIgreja, ministeriosDisponiveis, getNumeroVagas } = useVotacao();
  const [showEscolhaPDF, setShowEscolhaPDF] = useState(false);

  const handleGerarCompleto = () => {
    gerarRelatorioCompleto(nomeIgreja, resultados);
    setShowEscolhaPDF(false);
  };

  const handleGerarObjetivo = () => {
    gerarRelatorioObjetivo(nomeIgreja, resultados, getNumeroVagas);
    setShowEscolhaPDF(false);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Trophy className="text-yellow-600" size={32} />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Resultados da Votação</h1>
              <p className="text-gray-600">{nomeIgreja}</p>
            </div>
          </div>
          <button
            onClick={() => setShowEscolhaPDF(true)}
            disabled={resultados.length === 0}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-lg transition shadow-lg hover:shadow-xl"
          >
            <Download size={20} />
            Gerar Relatório
          </button>
        </div>
      </div>

      {/* Modal de Escolha do Tipo de PDF */}
      {showEscolhaPDF && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full m-4 animate-scaleIn">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Escolha o Tipo de Relatório</h3>

            <div className="space-y-3 mb-6">
              {/* Relatório Completo */}
              <button
                onClick={handleGerarCompleto}
                className="w-full p-4 bg-blue-50 hover:bg-blue-100 border-2 border-blue-300 rounded-lg transition text-left"
              >
                <div className="flex items-start gap-3">
                  <FileText className="text-blue-600 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <p className="font-bold text-blue-900 mb-1">Relatório Completo</p>
                    <p className="text-sm text-blue-700">
                      Inclui todos os candidatos, votos detalhados, porcentagens e classificação completa
                    </p>
                  </div>
                </div>
              </button>

              {/* Relatório Objetivo */}
              <button
                onClick={handleGerarObjetivo}
                className="w-full p-4 bg-green-50 hover:bg-green-100 border-2 border-green-300 rounded-lg transition text-left"
              >
                <div className="flex items-start gap-3">
                  <Target className="text-green-600 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <p className="font-bold text-green-900 mb-1">Relatório Objetivo</p>
                    <p className="text-sm text-green-700">
                      Mostra apenas os vencedores eleitos para cada vaga disponível
                    </p>
                  </div>
                </div>
              </button>
            </div>

            <button
              onClick={() => setShowEscolhaPDF(false)}
              className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Conteúdo */}
      {resultados.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <Users className="mx-auto text-gray-300 mb-4" size={64} />
          <p className="text-gray-500 text-lg">Nenhuma votação finalizada ainda</p>
          <p className="text-gray-400 text-sm mt-2">
            Os resultados aparecerão aqui conforme você finalizar as votações
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Resumo Geral */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Resumo Geral</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">Total de Ministérios</p>
                <p className="text-3xl font-bold text-blue-600">{ministeriosDisponiveis.length}</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">Votações Finalizadas</p>
                <p className="text-3xl font-bold text-green-600">{resultados.length}</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">Pendentes</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {ministeriosDisponiveis.length - resultados.length}
                </p>
              </div>
            </div>
          </div>

          {/* Lista de Resultados */}
          {resultados.map((resultado, index) => {
            const totalVotos = resultado.candidatos.reduce((acc, c) => acc + c.votos, 0);
            const candidatosOrdenados = [...resultado.candidatos].sort((a, b) => b.votos - a.votos);

            return (
              <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition">
                {/* Header do Resultado */}
                <div className="flex items-start justify-between mb-4 pb-4 border-b border-gray-200">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {resultado.ministerioNome}
                    </h3>
                    <p className="text-sm text-gray-600">{resultado.cargoNome}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Total de Votos</p>
                    <p className="text-2xl font-bold text-blue-600">{totalVotos}</p>
                  </div>
                </div>

                {/* Vencedor */}
                {resultado.vencedor && (
                  <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-400 rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-3">
                      <Trophy className="text-yellow-600" size={32} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-yellow-800">Vencedor(a)</p>
                        <p className="text-xl font-bold text-yellow-900">{resultado.vencedor}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-yellow-600">
                          {candidatosOrdenados[0].votos}
                        </p>
                        <p className="text-xs text-yellow-700">votos</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Lista de Candidatos */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-700 text-sm mb-3">Todos os Candidatos:</h4>
                  {candidatosOrdenados.map((candidato, idx) => {
                    const porcentagem = totalVotos > 0
                      ? ((candidato.votos / totalVotos) * 100).toFixed(1)
                      : '0';
                    const isVencedor = idx === 0;

                    return (
                      <div
                        key={candidato.id}
                        className={`flex items-center justify-between p-3 rounded-lg ${isVencedor
                          ? 'bg-yellow-50 border-l-4 border-yellow-500'
                          : 'bg-gray-50'
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${isVencedor
                            ? 'bg-yellow-500 text-white'
                            : 'bg-gray-300 text-gray-700'
                            }`}>
                            {idx + 1}
                          </span>
                          <span className={`font-medium ${isVencedor ? 'text-yellow-900' : 'text-gray-800'}`}>
                            {candidato.nome}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <span className="font-bold text-lg text-gray-800">{candidato.votos}</span>
                            <span className="text-sm text-gray-600 ml-1">votos</span>
                          </div>
                          <span className="text-sm font-medium text-gray-600 min-w-[50px] text-right">
                            {porcentagem}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Info Adicional */}
                <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between text-sm text-gray-600">
                  <span>
                    Finalizado em {new Date(resultado.timestamp).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                  <span>
                    Tempo: {Math.floor(resultado.tempoGasto / 60)} min {resultado.tempoGasto % 60} seg
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Estilos */}
      <style>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Relatorios;
