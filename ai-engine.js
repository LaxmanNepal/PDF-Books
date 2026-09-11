/* Local-first AI Book Engine — V6
   Provides extractive answers/summaries without pretending to be an LLM.
   A future backend can replace answer() while keeping the same interface. */
export class BookAI {
  constructor(pages=[]){this.pages=pages;this.text=pages.join(' ')}
  sentences(text=this.text){return text.replace(/\s+/g,' ').split(/(?<=[.!?।])\s+/).map(s=>s.trim()).filter(s=>s.length>25)}
  summary(limit=8){const s=this.sentences();if(!s.length)return 'यस पुस्तकमा selectable text भेटिएन।';const scored=s.map((x,i)=>({x,i,score:Math.min(8,x.length/90)+(i<Math.max(20,s.length*.15)?1:0)})).sort((a,b)=>b.score-a.score).slice(0,limit).sort((a,b)=>a.i-b.i);return scored.map(x=>'• '+x.x).join('\n')}
  keywords(limit=15){const stop=new Set('the and for with that this from have into are was were you your they their अनि तथा यस यो को मा र का ले लाई पनि एक छ छन्'.split(/\s+/));const m=new Map();for(const w of this.text.toLowerCase().match(/[\u0900-\u097f]{3,}|[a-z]{4,}/gi)||[]){if(!stop.has(w))m.set(w,(m.get(w)||0)+1)}return [...m.entries()].sort((a,b)=>b[1]-a[1]).slice(0,limit).map(([w,n])=>`${w} (${n})`).join(' • ')}
  answer(question){const q=(question||'').toLowerCase().trim();if(!q)return 'कृपया प्रश्न लेख्नुहोस्।';const words=q.match(/[\u0900-\u097f]{3,}|[a-z]{4,}/gi)||[];const ss=this.sentences();const scored=ss.map((s,i)=>({s,i,score:words.reduce((n,w)=>n+(s.toLowerCase().includes(w)?1:0),0)})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,5);if(!scored.length)return 'यस पुस्तकको उपलब्ध text मा यो प्रश्नको स्पष्ट matching भेटिएन।';return scored.map(x=>'• '+x.s).join('\n')}
  pageSummary(page){return this.summaryFromText(this.pages[page-1]||'')}
  summaryFromText(text){const s=this.sentences(text);return s.slice(0,5).map(x=>'• '+x).join('\n')||'यस पृष्ठमा selectable text छैन।'}
}
