import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Candidato {
  id: string;
  nome: string;
  votos: number;
}

interface ResultadoMinisterio {
  ministerioId: string;
  ministerioNome: string;
  cargoId: string;
  cargoNome: string;
  candidatos: Candidato[];
  vencedor?: string;
  timestamp: number;
  tempoGasto: number;
}

export const gerarRelatorioCompleto = (
  nomeIgreja: string,
  resultados: ResultadoMinisterio[]
) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let yPosition = 20;

  // Título
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('RELATÓRIO DE VOTAÇÃO - COMISSÃO DE NOMEAÇÕES', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 10;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text(nomeIgreja, pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 5;
  doc.setFontSize(10);
  doc.text(`Data: ${new Date().toLocaleDateString('pt-BR')}`, pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 15;

  // Resumo
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('RESUMO GERAL', 14, yPosition);
  yPosition += 8;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Total de Ministérios Votados: ${resultados.length}`, 14, yPosition);
  yPosition += 20;

  // Para cada ministério
  resultados.forEach((resultado, index) => {
    // Verificar se precisa de nova página
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }

    // Título do Ministério
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(`${index + 1}. ${resultado.ministerioNome}`, 14, yPosition);
    yPosition += 7;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.text(resultado.cargoNome, 14, yPosition);
    yPosition += 10;

    // Vencedor em destaque
    if (resultado.vencedor) {
      doc.setFillColor(255, 237, 213); // Amarelo claro
      doc.rect(14, yPosition - 5, pageWidth - 28, 12, 'F');
      doc.setFont('helvetica', 'bold');
      doc.text(`🏆 VENCEDOR(A): ${resultado.vencedor}`, 18, yPosition);
      yPosition += 15;
    }

    // Tabela de votos
    const totalVotos = resultado.candidatos.reduce((acc, c) => acc + c.votos, 0);
    const candidatosOrdenados = [...resultado.candidatos].sort((a, b) => b.votos - a.votos);
    
    const tableData = candidatosOrdenados.map((c, idx) => {
      const porcentagem = totalVotos > 0 ? ((c.votos / totalVotos) * 100).toFixed(1) : '0';
      return [
        `${idx + 1}º`,
        c.nome,
        c.votos.toString(),
        `${porcentagem}%`
      ];
    });

    autoTable(doc, {
      startY: yPosition,
      head: [['Posição', 'Candidato', 'Votos', '%']],
      body: tableData,
      theme: 'grid',
      styles: { fontSize: 9 },
      headStyles: { fillColor: [59, 130, 246], fontStyle: 'bold' },
      columnStyles: {
        0: { cellWidth: 20, halign: 'center' },
        1: { cellWidth: 'auto' },
        2: { cellWidth: 25, halign: 'center' },
        3: { cellWidth: 25, halign: 'center' }
      },
      didParseCell: (data) => {
        // Destacar primeira linha (vencedor)
        if (data.section === 'body' && data.row.index === 0) {
          data.cell.styles.fillColor = [255, 251, 235];
          data.cell.styles.fontStyle = 'bold';
        }
      }
    });

    yPosition = (doc as any).lastAutoTable.finalY + 8;

    // Info adicional
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100);
    const dataFinal = new Date(resultado.timestamp).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    const tempoMin = Math.floor(resultado.tempoGasto / 60);
    const tempoSeg = resultado.tempoGasto % 60;
    doc.text(`Finalizado em: ${dataFinal} | Tempo: ${tempoMin}min ${tempoSeg}seg`, 14, yPosition);
    doc.setTextColor(0);
    
    yPosition += 12;
  });

  // Rodapé
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(
      `Página ${i} de ${totalPages} | Sistema de Votação - Igreja Adventista`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }

  // Salvar
  const nomeArquivo = `Relatorio_Completo_${nomeIgreja.replace(/\s+/g, '_')}_${new Date().toLocaleDateString('pt-BR').replace(/\//g, '-')}.pdf`;
  doc.save(nomeArquivo);
};

export const gerarRelatorioObjetivo = (
  nomeIgreja: string,
  resultados: ResultadoMinisterio[],
  getNumeroVagas: (ministerioId: string) => number
) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let yPosition = 20;

  // Título
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('RELATÓRIO OBJETIVO - VENCEDORES', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 10;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text(nomeIgreja, pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 5;
  doc.setFontSize(10);
  doc.text(`Data: ${new Date().toLocaleDateString('pt-BR')}`, pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 15;

  // Criar tabela de vencedores
  const tableData = resultados.map(resultado => {
    const candidatosOrdenados = [...resultado.candidatos].sort((a, b) => b.votos - a.votos);
    const numeroVagas = getNumeroVagas(resultado.ministerioId);
    
    // Pegar os N primeiros (baseado no número de vagas)
    const vencedores = candidatosOrdenados.slice(0, numeroVagas);
    const nomesVencedores = vencedores.map(v => v.nome).join('\n');
    const votosVencedores = vencedores.map(v => `${v.votos} votos`).join('\n');

    return [
      resultado.ministerioNome,
      resultado.cargoNome,
      nomesVencedores,
      votosVencedores
    ];
  });

  autoTable(doc, {
    startY: yPosition,
    head: [['Ministério', 'Cargo', 'Vencedor(es)', 'Votos']],
    body: tableData,
    theme: 'striped',
    styles: { 
      fontSize: 9,
      cellPadding: 5
    },
    headStyles: { 
      fillColor: [34, 197, 94],
      fontStyle: 'bold',
      fontSize: 10
    },
    columnStyles: {
      0: { cellWidth: 50, fontStyle: 'bold' },
      1: { cellWidth: 45 },
      2: { cellWidth: 55 },
      3: { cellWidth: 30, halign: 'center' }
    }
  });

  yPosition = (doc as any).lastAutoTable.finalY + 15;

  // Resumo no final
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('RESUMO:', 14, yPosition);
  yPosition += 7;

  doc.setFont('helvetica', 'normal');
  doc.text(`Total de Ministérios: ${resultados.length}`, 14, yPosition);
  yPosition += 5;
  doc.text(`Total de Eleitos: ${resultados.reduce((acc, r) => acc + getNumeroVagas(r.ministerioId), 0)}`, 14, yPosition);

  // Rodapé
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(
      `Página ${i} de ${totalPages} | Sistema de Votação - Igreja Adventista`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }

  // Salvar
  const nomeArquivo = `Relatorio_Objetivo_${nomeIgreja.replace(/\s+/g, '_')}_${new Date().toLocaleDateString('pt-BR').replace(/\//g, '-')}.pdf`;
  doc.save(nomeArquivo);
};

