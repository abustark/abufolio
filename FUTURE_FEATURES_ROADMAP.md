# Future Features & High-Impact Enhancements Roadmap

This roadmap documents the specifications for planned interactive Data, Machine Learning, and UX features to be added to **Abufolio** in upcoming iterations.

---

## 1. Interactive Amazon Data Quality & Validation Simulator

### Overview
As an **ML Data Associate II at Amazon**, one of Basith's primary achievements is validating large-scale multi-modal datasets with **98%+ accuracy** and driving a **+16% team workflow efficiency** improvement. This widget lets recruiters and hiring managers interact with real-world validation metrics directly on the page.

### Proposed Location
- Integrated into Section 03 (Technical Capabilities / Enterprise Rigor card) or as a dedicated interactive showcase in the Hero/About section.

### Architecture & Capabilities
1. **Interactive Controls**:
   - **Dataset Volume Slider**: Adjust batch size (e.g., 10k to 500k multimodal records: Text, Audio, Video, Image).
   - **Annotation Complexity Toggle**: Multi-class categorization vs. fine-grained semantic bounding boxes vs. cross-modal alignment.
   - **Error Tolerance Threshold**: Toggle strict enterprise SLA parameters.
2. **Real-Time Calculation & Visual Feedback**:
   - Live calculation of **Precision**, **Recall**, **F1-Score**, and **Throughput Rate**.
   - Interactive **Confusion Matrix** visual representation that updates dynamically as visitors slide the controls.
   - Highlights the Amazon metric: **98%+ Baseline Accuracy Achieved**.

---

## 2. In-Portfolio House Price ML Estimator Widget

### Overview
Currently, the House Price Prediction project links out to an external Streamlit application. Embedding an instant interactive calculation widget directly inside the project card or case notes modal allows visitors to test the Random Forest regression model without leaving the site.

### Proposed Location
- Case Notes Modal (<dialog class="project-dialog">) or directly inside the House Price project card.

### Architecture & Capabilities
1. **Feature Inputs**:
   - Square Footage (slider: 500 sq ft to 5,000 sq ft).
   - Bedrooms / BHK count (pills: 1, 2, 3, 4, 5+).
   - Location tier (select dropdown: Tier 1 Metro, Suburban, Developing Hub).
   - Amenities score (toggle: Basic, Standard, Luxury).
2. **Client-Side Model Inference**:
   - Lightweight pre-calculated regression coefficients / decision tree approximation packaged in a compact JSON payload.
   - Instant live estimated price calculation with a confidence interval range (e.g., ₹ 84.5 L ± 4.2%).

---

## 3. Embedded Resume Quick-Look Modal

### Overview
Instead of forcing visitors to open a separate tab for the PDF or rely on external PDF viewers, provide an integrated, glassmorphism modal for instant reading with 1-click download.

### Architecture & Capabilities
1. **Modal Container**:
   - <dialog class="resume-dialog"> with backdrop blur and smooth entrance animation.
2. **Viewer Options**:
   - Embedded high-fidelity SVG/HTML formatted resume view for instant load on all devices.
   - Direct download button (ssets/Basith_AbuSyed_Resume.pdf).
   - Copy plain-text resume summary button for quick clipboard sharing.

---

## 4. Enhanced Spotlight Command Palette Shortcuts

### Overview
Extend the Ctrl + K / Cmd + K Command Palette with direct action queries:
- /amazon -> Instantly jump to Amazon enterprise experience and validation highlights.
- /skills -> Filter and highlight Python, Scikit-learn, SQL, and Power BI.
- /model -> Launch the interactive ML estimator.
- /resume -> Launch the in-page quick-look resume viewer.
