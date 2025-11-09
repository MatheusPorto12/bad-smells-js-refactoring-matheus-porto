export class ReportGenerator {
  constructor(database) {
    this.db = database;
  }

  /**
   * Gera um relatório de itens baseado no tipo e no usuário.
   * - Admins veem tudo.
   * - Users comuns só veem itens com valor <= 500.
   */
  generateReport(reportType, user, items) {
    let report = this._generateHeader(reportType, user);
    const { processedItems, total } = this._processItems(items, user, reportType);
    
    report += processedItems;
    report += this._generateFooter(reportType, total);

    return report.trim();
  }

  /**
   * Gera o cabeçalho do relatório baseado no tipo
   */
  _generateHeader(reportType, user) {
    if (reportType === 'CSV') {
      return this._generateCSVHeader();
    }
    
    if (reportType === 'HTML') {
      return this._generateHTMLHeader(user);
    }
    
    return '';
  }

  /**
   * Gera cabeçalho CSV
   */
  _generateCSVHeader() {
    return 'ID,NOME,VALOR,USUARIO\n';
  }

  /**
   * Gera cabeçalho HTML
   */
  _generateHTMLHeader(user) {
    return `<html><body>
<h1>Relatório</h1>
<h2>Usuário: ${user.name}</h2>
<table>
<tr><th>ID</th><th>Nome</th><th>Valor</th></tr>
`;
  }

  /**
   * Processa todos os itens baseado no usuário e tipo de relatório
   */
  _processItems(items, user, reportType) {
    let processedItems = '';
    let total = 0;

    for (const item of items) {
      if (this._shouldIncludeItem(item, user)) {
        this._setPriorityForAdmin(item, user);
        const formattedItem = this._formatItem(item, user, reportType);
        processedItems += formattedItem;
        total += item.value;
      }
    }

    return { processedItems, total };
  }

  /**
   * Verifica se o item deve ser incluído baseado no papel do usuário
   */
  _shouldIncludeItem(item, user) {
    if (user.role === 'ADMIN') {
      return true;
    }
    
    return user.role === 'USER' && item.value <= 500;
  }

  /**
   * Define prioridade para admins em itens com valor alto
   */
  _setPriorityForAdmin(item, user) {
    if (user.role === 'ADMIN' && item.value > 1000) {
      item.priority = true;
    }
  }

  /**
   * Formata um item baseado no tipo de relatório
   */
  _formatItem(item, user, reportType) {
    if (reportType === 'CSV') {
      return this._formatCSVItem(item, user);
    }
    
    if (reportType === 'HTML') {
      return this._formatHTMLItem(item);
    }
    
    return '';
  }

  /**
   * Formata item para CSV
   */
  _formatCSVItem(item, user) {
    return `${item.id},${item.name},${item.value},${user.name}\n`;
  }

  /**
   * Formata item para HTML
   */
  _formatHTMLItem(item) {
    const style = item.priority ? ' style="font-weight:bold;"' : '';
    return `<tr${style}><td>${item.id}</td><td>${item.name}</td><td>${item.value}</td></tr>\n`;
  }

  /**
   * Gera o rodapé do relatório baseado no tipo
   */
  _generateFooter(reportType, total) {
    if (reportType === 'CSV') {
      return this._generateCSVFooter(total);
    }
    
    if (reportType === 'HTML') {
      return this._generateHTMLFooter(total);
    }
    
    return '';
  }

  /**
   * Gera rodapé CSV
   */
  _generateCSVFooter(total) {
    return `\nTotal,,\n${total},,\n`;
  }

  /**
   * Gera rodapé HTML
   */
  _generateHTMLFooter(total) {
    return `</table>\n<h3>Total: ${total}</h3>\n</body></html>\n`;
  }
}
