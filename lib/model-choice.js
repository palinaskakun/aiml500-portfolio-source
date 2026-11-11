export function modelChoiceContent() {
  return `
    <header class="page-heading">
      <span class="eyebrow">ARTIFACT 03 / AIML-500 / ASSIGNMENT 2.3</span>
      <h1 id="page-title">ML vs. Deep Learning.</h1>
      <p>Choosing the right approach. An individual case-study comparison of house-price prediction and plant-disease recognition.</p>
    </header>
    <article class="artifact-feature">
      <div class="artifact-cover model-choice-cover"><small>PALINASONIC<br />AIML-500 / DISC 03</small><h2>Which model<br />fits the role?</h2><div class="model-choice-mark" aria-hidden="true">ML <span>↔</span> DL</div><span>CASE-STUDY ANALYSIS / 2026</span></div>
      <div class="artifact-summary">
        <span class="inline-tag artifact-published">INDIVIDUAL PAPER · COMPARING APPROACHES</span>
        <h2>Start with the problem.</h2>
        <p>In this paper, I compare two published applications and explain why their data and goals call for different approaches. One predicts a number from housing attributes. The other classifies photographs of cassava leaves.</p>
        <p>The skill on this disc is technical judgment: explaining a model choice, considering alternatives, and recognizing when extra complexity needs evidence.</p>
        <div class="artifact-meta">PALINA SKAKUN · NOVEMBER 2, 2026 · WORKSHOP 2</div>
        <div class="artifact-actions"><a class="screen-button" href="./assets/artifacts/ml-vs-deep-learning.pdf" target="_blank" rel="noopener noreferrer">READ FINAL PAPER · PDF ↗</a><a class="screen-button secondary" href="./assets/artifacts/ml-vs-deep-learning.docx" download>ORIGINAL WORD FILE ↓</a></div>
      </div>
    </article>
    <section class="model-comparison" aria-labelledby="model-comparison-title">
      <h2 id="model-comparison-title" class="section-title">TWO CASES. DIFFERENT REQUIREMENTS.</h2>
      <p>Deep learning is part of machine learning. Here, “traditional ML” refers to approaches such as linear regression, contrasted with deep neural networks.</p>
      <div class="comparison-table-wrap" role="region" aria-label="Case study comparison" tabindex="0"><table class="model-comparison-table"><caption>A reading guide to the two studies discussed in my paper</caption><thead><tr><th scope="col">Consideration</th><th scope="col">House prices</th><th scope="col">Plant disease</th></tr></thead><tbody>
        <tr><th scope="row">Task</th><td>Predict a sale price.</td><td>Classify disease or pest damage from a leaf image.</td></tr>
        <tr><th scope="row">Data</th><td>Structured housing attributes.</td><td>Photographs of cassava leaves.</td></tr>
        <tr><th scope="row">Approach</th><td>Multiple linear regression.</td><td>CNN features through transfer learning, evaluated with several classifiers.</td></tr>
        <tr><th scope="row">Why it fits</th><td>Models relationships between recorded attributes and price.</td><td>Learns visual representations instead of relying only on manually designed image features.</td></tr>
        <tr><th scope="row">What to consider</th><td>Prediction uncertainty and whether more complexity improves performance on new data.</td><td>Whether performance holds beyond the study’s images and conditions.</td></tr>
        <tr><th scope="row">Source</th><td><a class="text-link" href="https://jse.amstat.org/v16n2/datasets.pardoe.html" target="_blank" rel="noopener noreferrer">Pardoe (2008) ↗</a></td><td><a class="text-link" href="https://doi.org/10.3389/fpls.2017.01852" target="_blank" rel="noopener noreferrer">Ramcharan et al. (2017) ↗</a></td></tr>
      </tbody></table></div>
    </section>
    <div class="artifact-details">
      <details open><summary>01 / Introduction & description</summary><div>
        <p><strong>Intended audience:</strong> beginning AI/ML learners and software developers who want to understand why a particular learning approach fits a problem.</p>
        <p>My final paper, <em>Machine Learning vs. Deep Learning</em>, uses two research articles to compare a regression task with an image-classification task. It connects the type of input data, the desired output, feature selection, and model complexity.</p>
        <p>The original submitted Word file is preserved unchanged. A PDF reading copy and this comparison guide make the work easier to explore in the portfolio.</p>
      </div></details>
      <details><summary>02 / Objective</summary><div>
        <p>Differentiate traditional machine learning and deep learning using real applications, explain why each approach suits its example, and consider the tradeoffs of choosing an alternative.</p>
        <p>The central question is which method meets the problem’s requirements, including its data and need for explanation.</p>
      </div></details>
      <details><summary>03 / Process & my contribution</summary><div>
        <ol class="artifact-process"><li><strong>Select two applications.</strong> I chose house-price prediction and plant-disease recognition to compare structured data with images.</li><li><strong>Read the research.</strong> I used Pardoe’s housing analysis and Ramcharan and colleagues’ cassava study to ground the comparison in published work.</li><li><strong>Explain the choices.</strong> I discussed the inputs, why each approach fits, and what would need to justify a different model.</li><li><strong>Keep the nuance.</strong> The cassava study combines deep features with classifiers including an SVM, showing that traditional ML and deep learning can be used together.</li><li><strong>Adapt the presentation.</strong> For this portfolio, I added a comparison table and direct access to the final paper and references.</li></ol>
        <p><strong>My contribution:</strong> this is my individual written analysis. The models, datasets, and experiments belong to the cited researchers. I did not train or benchmark these models for this assignment.</p>
      </div></details>
      <details><summary>04 / Tools & sources</summary><div>
        <dl class="artifact-tools"><div><dt>Research articles</dt><dd>Evidence for the applications and their modeling approaches.</dd></div><div><dt>Word document</dt><dd>The final written report, references, and AI-use disclosure.</dd></div><div><dt>ChatGPT</dt><dd>The submitted paper discloses using ChatGPT to help locate research articles.</dd></div><div><dt>Portfolio comparison</dt><dd>A web reading guide and PDF copy for visitors who want to scan the key differences or read the full work.</dd></div></dl>
      </div></details>
      <details><summary>05 / Artifact value proposition</summary><div>
        <h3>Unique value</h3><p>This artifact explains the reasoning behind a model choice using two concrete cases. It also recognizes that deep learning and traditional methods can work together.</p>
        <h3>Relevance to the audience</h3><p>A beginner can use the comparison to ask better questions about a proposed AI solution: what data are available, what output is needed, and what evidence supports the approach? This connects with my focus on making technical decisions understandable and useful.</p>
      </div></details>
      <details><summary>06 / Takeaways & limits</summary><div>
        <p><strong>My main takeaway:</strong> a more complicated model needs a reason. The paper considers how data, explanation, and performance on new examples affect that decision.</p>
        <p><strong>A useful qualification:</strong> a small dataset does not automatically rule out deep learning. Transfer learning can reuse representations learned elsewhere; the cassava paper illustrates that approach. Dataset size should be considered alongside the task and validation evidence.</p>
        <p>This artifact compares published cases rather than conducting a controlled experiment between models. It does not establish that one method is always best for housing or plant images.</p>
      </div></details>
      <details><summary>07 / References & AI disclosure</summary><div>
        <p>Skakun, P. (2026, November 2). <em>Machine learning vs. deep learning</em> [Course paper]. AIML-500, Indiana Wesleyan University. <a class="text-link" href="./assets/artifacts/ml-vs-deep-learning.pdf" target="_blank" rel="noopener noreferrer">Final paper ↗</a>.</p>
        <p>Pardoe, I. (2008). Modeling home prices using realtor data. <em>Journal of Statistics Education, 16</em>(2). <a class="text-link" href="https://doi.org/10.1080/10691898.2008.11889569" target="_blank" rel="noopener noreferrer">https://doi.org/10.1080/10691898.2008.11889569</a>. <a class="text-link" href="https://jse.amstat.org/v16n2/datasets.pardoe.html" target="_blank" rel="noopener noreferrer">Read the journal’s archived article ↗</a>.</p>
        <p>Ramcharan, A., Baranowski, K., McCloskey, P., Ahmed, B., Legg, J., & Hughes, D. P. (2017). Deep learning for image-based cassava disease detection. <em>Frontiers in Plant Science, 8</em>, Article 1852. <a class="text-link" href="https://doi.org/10.3389/fpls.2017.01852" target="_blank" rel="noopener noreferrer">https://doi.org/10.3389/fpls.2017.01852</a>.</p>
        <h3>AI-use disclosure</h3><p>The submitted paper states that I used ChatGPT to help locate research articles. The portfolio’s shared footer separately acknowledges AI assistance with writing and rewriting its presentation.</p>
      </div></details>
    </div>
    <div class="plain-nav"><a href="#artifacts">↵ ARTIFACT 01</a><a href="#timeline">↵ ARTIFACT 02</a><a href="#contact">CONTACT ↗</a></div>
  `;
}
