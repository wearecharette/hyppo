/**
 * Rewrite settings to be exported from the design doc
 */

module.exports = [
	{from: '/healthcheck', to: '/static/healthcheck.json'},
	{from: '/deploy', to: '/static/deploy/index.html'},
	{from: '/sssp2-0/*', to: '/static/deploy/sssp2-0/*'},
	{from: '/sweetauburn1/*', to: '/static/deploy/sweetauburn1/*'},
	{from: '/sweetauburn2/*', to: '/static/deploy/sweetauburn2/*'},
	{from: '/cache.manifest', to: '_show/cache'},
	{from: '/_show/*', to: '/_show/*'},
	{from: '/_update/*', to: '/_update/*'},
	{from: '/_list/*', to: '/_list/*'},
	{from: '/_view/*', to: '/_view/*'},
	{from: '/_design', to: '/'},
	{from: '/_uuids', to: '../../../_uuids', query: {'count': '1'}},
	{from: '/contact-form', to: '/_update/contact/contact-tpl'},
	{from: '/menuat/*', to: '../../../menuat/*'},
  {from: '/static/*', to: '/static/*'},
  {from: '/ico/*', to: '/static/ico/*'},
	{from: '/img/*', to: '/static/img/*'},
	{from: '/js/*', to: '/static/js/*'},
	{from: '/css/*', to: '/static/css/*'},
	{from: '/fonts/*', to: '/static/fonts/*'},
	{from: '/assets/*', to: '/static/assets/*'},
	{from: '/modules.js', to: 'modules.js'},
	{from: '/admin', to: '_show/form/create_doc'},
	{from: '/query', to: '_list/query/by_type', query: {'include_docs': 'true'}},
	{from: '/queryedit', to: '_list/queryedit/by_type', query: {'include_docs': 'true'}},
	{from: '/spacetime', to: '_show/inspector/spacetime'},
	{from: '/edit', to: '_show/edit_page/index.html'},
	{from: '/edit/*', to: '_show/edit_page/*'},
	{from: '/dashboard', to: '_show/dashboard/dashboard.html'},
	{from: '/dashboard/*', to: '_show/dashboard/*'},
	{from: '/search/*', to: '../../../_fti/local/menuat/_design/search/*'},
	{from: '/', to: '_show/page/index.html'},
	{from: '/*', to: '_show/page/*'}
];
