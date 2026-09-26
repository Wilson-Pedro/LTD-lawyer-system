export function formatarData(data: string | Date | null | undefined): string {
  if (!data) return '-';

  // Previne o bug de fuso horário do JavaScript
  // Se a data vier apenas como "YYYY-MM-DD" do back-end, o JS assume UTC e
  // pode subtrair 3 horas no Brasil, caindo para o dia anterior.
  if (typeof data === 'string' && data.length === 10) {
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  }

  // Para outros formatos (ISO completos com hora, ou objetos Date)
  try {
    const dataObj = new Date(data);
    return new Intl.DateTimeFormat('pt-BR', {
      timeZone: 'America/Sao_Paulo',
    }).format(dataObj);
  } catch (error) {
    return String(data); // Fallback caso venha um texto inválido
  }
}
