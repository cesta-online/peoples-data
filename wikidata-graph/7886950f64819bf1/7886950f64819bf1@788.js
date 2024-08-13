import define1 from "./8a27b157df6169aa@121.js";
import define2 from "./e93997d5089d7165@2303.js";

function _1(md){return(
md`# Exploring the Wikidata Knowledge Graph`
)}

function _id(text,URLSearchParams,location){return(
text({
  title: 'Wikidata Unique Identifier (QID)',
  //
  value: (
    new URLSearchParams(location.search).get("id") || "Q127786639"
  ).replace(/_/g, ' '),
  description: "For example, AB 481 Category 1 is Q127786639 and Rifle is Q124072. Limited to 10 ingoing and outgoing edges.",
  submit: "Go"
})
)}

function _3(dot,id,nodes,edges){return(
dot`digraph "${id}" {
  outputorder=edgesfirst
  graph[rankdir=LR, center=true]
  node[shape=none, fontname="Source Serif Pro", fontsize=13]
  edge[arrowsize=0.6, arrowhead=vee, color=gray]
  ${nodes}
  ${edges}
 }`
)}

function _nodes(picturein,wrapText,pictureout){return(
picturein.map(i => `"${wrapText(i.valueLabel)}" [URL="?id=${i.value.split("/")[i.value.split("/").length-1]}", fontcolor="#3182bd", target="_top"]`).concat(pictureout.map(i => `"${wrapText(i.valueLabel)}" [URL="?id=${i.value.split("/")[i.value.split("/").length-1]}", fontcolor="#3182bd", target="_top"]`)).join("\n")
)}

function _edges(picturein,wrapText,pictureout){return(
Array.from(new Set(picturein.map(i => `"${wrapText(i.valueLabel)}" -> "${wrapText(i.itemLabel)}" [label="${wrapText(i.edgeLabel)}"]`).concat(pictureout.map(i => `"${wrapText(i.itemLabel)}" -> "${wrapText(i.valueLabel)}" [label="${wrapText(i.edgeLabel)}"]`)))).join("\n")
)}

function _query(){return(
`SELECT ?parent ?parentLabel ?count
WHERE
{
  {
    SELECT ?parent (COUNT(?child) AS ?count)
    WHERE
    {
      ?parent wdt:P40 ?child.
    }
    GROUP BY ?parent
    ORDER BY DESC(?count)
    LIMIT 10
  }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}
ORDER BY DESC(?count)
LIMIT 10`
)}

function _graphqueryout(id){return(
`SELECT ?item ?itemLabel ?itemImage ?value ?valueLabel ?valueImage ?edgeLabel WHERE {
  {BIND(wd:${id} AS ?item)
  ?item ?wdt ?value.
  ?edge a wikibase:Property;
        wikibase:propertyType wikibase:WikibaseItem; # note: to show all statements, removing this is not enough, the graph view only shows entities
        wikibase:directClaim ?wdt.
  OPTIONAL { ?item wdt:P18 ?itemImage. }
  OPTIONAL { ?value wdt:P18 ?valueImage. }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en".}}
}
LIMIT 10`
)}

function _graphqueryin(id){return(
`SELECT ?item ?itemLabel ?itemImage ?value ?valueLabel ?valueImage ?edgeLabel WHERE {
  {BIND(wd:${id} AS ?item)
  ?value ?wdt ?item.
  ?edge a wikibase:Property;
        wikibase:propertyType wikibase:WikibaseItem; # note: to show all statements, removing this is not enough, the graph view only shows entities
        wikibase:directClaim ?wdt.
  OPTIONAL { ?item wdt:P18 ?itemImage. }
  OPTIONAL { ?value wdt:P18 ?valueImage. }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en".}}
}
LIMIT 10`
)}

function _pictureout(queryDispatcher,graphqueryout){return(
queryDispatcher.query(graphqueryout)
)}

function _picturein(queryDispatcher,graphqueryin){return(
queryDispatcher.query(graphqueryin)
)}

function _12(picturein,wrapText){return(
picturein.map(i => `"${wrapText(i.itemLabel)}" -> "${wrapText(i.valueLabel)}"`).join("\n")
)}

function _13(domsToDiv,pick,articles){return(
domsToDiv(pick(articles, 'intro'))
)}

function _14(md){return(
md`## Appendix`
)}

function _baseUrl(){return(
'https://en.wikipedia.org'
)}

function _pick(){return(
(v, k) => [].concat(...v.map(d => d[k]))
)}

function _domsToDiv(){return(
doms => {
  const container = document.createElement('div');
  doms.forEach(dom => (dom ? container.appendChild(dom) : null));

  return container;
}
)}

function _cleanId(baseUrl){return(
id => decodeURI(id.replace(`${baseUrl}/wiki/`, '').replace(/ /g, '_'))
)}

function _lexer(){return(
text => text.split(/[_ ]/g)
)}

function _wrapText(lexer){return(
(text, len = 15) => {
  const words = lexer(text);
  let lines = '';
  let count = 0;
  for (let word of words) {
    if (count + word.length >= len) {
      lines += `\n${word} `;
      count = word.length;
    } else {
      lines += `${word} `;
      count += word.length;
    }
  }
  return lines.trim();
}
)}

function _qs(){return(
params =>
  Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join('&')
)}

function _loadArticle(baseUrl,qs){return(
id =>
  fetch(
    `${baseUrl}/w/api.php?${qs({
      format: 'json',
      origin: '*',
      action: 'parse',
      prop: 'text',
      redirects: true,
      page: id,
      section: 0
    })}`
  ).then(response => response.json())
)}

function _loadArticles(loadArticle,cleanId){return(
links =>
  Promise.all(links.map(link => loadArticle(cleanId(link))))
)}

function _domParser(DOMParser){return(
new DOMParser()
)}

function _addBaseToLinks(baseUrl){return(
text => text.replace(/href="/g, 'href="' + baseUrl)
)}

function _constructDom(domParser){return(
text => domParser.parseFromString(text, 'text/html')
)}

function _filterLinks(){return(
links =>
  links.filter(
    link =>
      link.indexOf('#cite') === -1 &&
      link.indexOf('upload.') === -1 &&
      link.indexOf('File:') === -1 &&
      link.indexOf('.php') === -1 &&
      link.indexOf('#') === -1 &&
      link.indexOf('.orghttp') === -1 &&
      link.indexOf('Help:') === -1
  )
)}

function _selectIntro(){return(
dom =>
  Array.from(
    dom.querySelectorAll('.mw-parser-output > p:not(.mw-empty-elt)')
  ).find(el => !el.querySelector('#coordinates'))
)}

function _importNode(){return(
dom => document.importNode(dom, true)
)}

function _extractLinks(){return(
dom =>
  Array.from(dom.querySelectorAll('a')).map(link => link.href)
)}

function _processResponse(cleanId,importNode,selectIntro,constructDom,addBaseToLinks,filterLinks,extractLinks){return(
response => {
  if (!response || response.error || !response.parse) {
    return {
      id: '',
      intro: null,
      links: []
    };
  }
  try {
    const id = cleanId(response.parse.title);
    const intro = importNode(
      selectIntro(constructDom(addBaseToLinks(response.parse.text['*'])))
    );
    const links = filterLinks(extractLinks(intro));

    return {
      id,
      intro,
      links,
      ...response.parse
    };
  } catch (e) {
    return {
      id: '',
      intro: null,
      links: []
    };
  }
}
)}

async function _rootArticle(loadArticles,cleanId,id,processResponse){return(
(await loadArticles([cleanId(id)])).map(processResponse)
)}

async function _secondArticles(loadArticles,pick,rootArticle,processResponse){return(
(await loadArticles(pick(rootArticle, 'links'))).map(
  processResponse
)
)}

function _thirdArticles(){return(
[]
)}

function _articles(rootArticle,secondArticles){return(
(rootArticle ? rootArticle : []).concat(
  secondArticles ? secondArticles : []
  //, thirdArticles ? thirdArticles : []
)
)}

function _redirects(pick,articles){return(
pick(articles, 'redirects').filter(d => d)
)}

function _dot(require){return(
require("@observablehq/graphviz@0.2")
)}

function _39(md)
{
  const refs = [
    '@mbostock/working-with-wikipedia-data',
    '@mbostock/graphviz',
    '@observablehq/how-observable-runs',
    '@observablehq/notebook-visualizer',
    '@chriszs/wikipedia-concept-graph'
  ];

  return md`refs: ${refs.map(d => `[${d}](/${d})`).join(', ')}`;
}


export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof id")).define("viewof id", ["text","URLSearchParams","location"], _id);
  main.variable(observer("id")).define("id", ["Generators", "viewof id"], (G, _) => G.input(_));
  main.variable(observer()).define(["dot","id","nodes","edges"], _3);
  main.variable(observer("nodes")).define("nodes", ["picturein","wrapText","pictureout"], _nodes);
  main.variable(observer("edges")).define("edges", ["picturein","wrapText","pictureout"], _edges);
  main.variable(observer("query")).define("query", _query);
  const child1 = runtime.module(define1);
  main.import("queryDispatcher", child1);
  main.variable(observer("graphqueryout")).define("graphqueryout", ["id"], _graphqueryout);
  main.variable(observer("graphqueryin")).define("graphqueryin", ["id"], _graphqueryin);
  main.variable(observer("pictureout")).define("pictureout", ["queryDispatcher","graphqueryout"], _pictureout);
  main.variable(observer("picturein")).define("picturein", ["queryDispatcher","graphqueryin"], _picturein);
  main.variable(observer()).define(["picturein","wrapText"], _12);
  main.variable(observer()).define(["domsToDiv","pick","articles"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("baseUrl")).define("baseUrl", _baseUrl);
  main.variable(observer("pick")).define("pick", _pick);
  main.variable(observer("domsToDiv")).define("domsToDiv", _domsToDiv);
  main.variable(observer("cleanId")).define("cleanId", ["baseUrl"], _cleanId);
  main.variable(observer("lexer")).define("lexer", _lexer);
  main.variable(observer("wrapText")).define("wrapText", ["lexer"], _wrapText);
  main.variable(observer("qs")).define("qs", _qs);
  main.variable(observer("loadArticle")).define("loadArticle", ["baseUrl","qs"], _loadArticle);
  main.variable(observer("loadArticles")).define("loadArticles", ["loadArticle","cleanId"], _loadArticles);
  main.variable(observer("domParser")).define("domParser", ["DOMParser"], _domParser);
  main.variable(observer("addBaseToLinks")).define("addBaseToLinks", ["baseUrl"], _addBaseToLinks);
  main.variable(observer("constructDom")).define("constructDom", ["domParser"], _constructDom);
  main.variable(observer("filterLinks")).define("filterLinks", _filterLinks);
  main.variable(observer("selectIntro")).define("selectIntro", _selectIntro);
  main.variable(observer("importNode")).define("importNode", _importNode);
  main.variable(observer("extractLinks")).define("extractLinks", _extractLinks);
  main.variable(observer("processResponse")).define("processResponse", ["cleanId","importNode","selectIntro","constructDom","addBaseToLinks","filterLinks","extractLinks"], _processResponse);
  main.variable(observer("rootArticle")).define("rootArticle", ["loadArticles","cleanId","id","processResponse"], _rootArticle);
  main.variable(observer("secondArticles")).define("secondArticles", ["loadArticles","pick","rootArticle","processResponse"], _secondArticles);
  main.variable(observer("thirdArticles")).define("thirdArticles", _thirdArticles);
  main.variable(observer("articles")).define("articles", ["rootArticle","secondArticles"], _articles);
  main.variable(observer("redirects")).define("redirects", ["pick","articles"], _redirects);
  const child2 = runtime.module(define2);
  main.import("text", child2);
  main.variable(observer("dot")).define("dot", ["require"], _dot);
  main.variable(observer()).define(["md"], _39);
  return main;
}
