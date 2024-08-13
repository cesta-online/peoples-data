// https://observablehq.com/@lukesmurray/wikidata-sparql-helpers@121
import define1 from "./09403b146bada149@524.js";

function _1(md){return(
md`# Wikidata Sparql Helpers`
)}

function _2(md){return(
md`
Wikidata is a surprisingly rich source of information, often containing reasonably decent samples of data which is hard or impossible to find in other places. While creating data visualizations of wikidata datasets I started using the following helpers to access [sparql queries](https://www.wikidata.org/wiki/Wikidata:SPARQL_tutorial) from within observable.
`
)}

function _3(md){return(
md`## Example Usage`
)}

function _4(md){return(
md`Start by using the the wikidata [sparql query service](https://query.wikidata.org/) to build the queries. If you need to learn how to write sparql checkout the [sparql tutorial](https://www.wikidata.org/wiki/Wikidata:SPARQL_tutorial).
`
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

function _6(md){return(
md`Once you have a query you can run it using the queryDispatcher.

~~~js
import {queryDispatcher} from "@lukesmurray/wikidata-sparql-helpers"
~~~
`
)}

function _7(md){return(
md`We can use an example from the wikidata documentation to find the entities on wikidata with the most children. The \`queryDispatcher\` will return an array of objects each containing the values we selected. In this case \`parent parentLabel\` and \`count\`.
`
)}

function _mostChildren(queryDispatcher,query){return(
queryDispatcher.query(query)
)}

function _9(md){return(
md`We can then chart the data with a bar chart.`
)}

function _mostChildrenData(mostChildren){return(
mostChildren.map(res => ({
  name: res.parentLabel,
  value: +res.count
}))
)}

function _12(barchart){return(
barchart
)}

function _13(md){return(
md`## Helpers`
)}

function _14(md){return(
md`These are some simple api helpers. Specifically to fix [query limits](https://www.mediawiki.org/wiki/Wikidata_Query_Service/User_Manual#Query_limits)`
)}

function _fetchRetry(sleep){return(
function fetchRetry(url, options = {}) {
  return fetch(url, options).then(res => {
    // handle rate limiting
    if (res.status === 429) {
      const retryAfter = res.headers.get("retry-after");
      return sleep(+retryAfter * 1000).then(fetchRetry);
    }
    return res;
  });
}
)}

function _sleep(){return(
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
)}

function _17(md){return(
md`These helpers actually run sparql queries. They are based off of the example code created from the wikidata sparql query service`
)}

function _SPARQLQueryDispatcher(fetchRetry){return(
class SPARQLQueryDispatcher {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  query(sparqlQuery) {
    const fullUrl = this.endpoint + '?query=' + encodeURIComponent(sparqlQuery);
    const headers = { Accept: 'application/sparql-results+json' };

    return fetchRetry(fullUrl, { headers })
      .then(body => body.json())
      .then(res =>
        res.results.bindings.map(binding => {
          const simpleBinding = {};
          for (let prop in binding) {
            simpleBinding[prop] = binding[prop].value;
          }
          return simpleBinding;
        })
      );
  }
}
)}

function _wikidataEndpoint(){return(
"https://query.wikidata.org/sparql"
)}

function _queryDispatcher(SPARQLQueryDispatcher,wikidataEndpoint){return(
new SPARQLQueryDispatcher(wikidataEndpoint)
)}

function _21(md){return(
md`These helpers help with data conversion`
)}

function _entityId(){return(
entityUrl => new URL(entityUrl).pathname.split("/").pop()
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("query")).define("query", _query);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("mostChildren")).define("mostChildren", ["queryDispatcher","query"], _mostChildren);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("mostChildrenData")).define("mostChildrenData", ["mostChildren"], _mostChildrenData);
  const child1 = runtime.module(define1).derive([{name: "mostChildrenData", alias: "data"}], main);
  main.import("chart", "barchart", child1);
  main.variable(observer()).define(["barchart"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("fetchRetry")).define("fetchRetry", ["sleep"], _fetchRetry);
  main.variable(observer("sleep")).define("sleep", _sleep);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("SPARQLQueryDispatcher")).define("SPARQLQueryDispatcher", ["fetchRetry"], _SPARQLQueryDispatcher);
  main.variable(observer("wikidataEndpoint")).define("wikidataEndpoint", _wikidataEndpoint);
  main.variable(observer("queryDispatcher")).define("queryDispatcher", ["SPARQLQueryDispatcher","wikidataEndpoint"], _queryDispatcher);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer("entityId")).define("entityId", _entityId);
  return main;
}
