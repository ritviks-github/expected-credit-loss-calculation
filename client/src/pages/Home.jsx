import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="bg-light min-vh-100">
      {/* Header */}
      <header className="bg-white border-bottom shadow-sm py-3">
        <div className="container d-flex align-items-center gap-3">
          <i className="bi bi-calculator fs-3 text-primary"></i>
          <div>
            <h1 className="h3 fw-bold text-dark m-0">Expected Credit Loss Calculation</h1>
            <p className="text-muted m-0">Advanced Risk Management & Financial Modeling</p>
          </div>
        </div>
      </header>
            <br />
          <Link className='btn btn-dark' to='/login'>Try Out !</Link>
      <div className="container py-5">
        {/* Hero */}
        <div className="text-center mb-5">
          <span className="badge bg-secondary mb-3">IFRS 9 Compliant</span>
          <h2 className="display-5 fw-bold text-dark mb-3">Comprehensive Credit Risk Assessment</h2>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '700px' }}>
            Expected Credit Loss (ECL) is a forward-looking approach to credit risk management that estimates potential
            losses from financial instruments over their lifetime.
          </p>
        </div>

        {/* Key Concepts */}
        <div className="row g-4 mb-5">
          {[
            ['Probability of Default (PD)', 'bi-graph-down', 'text-danger', 'Likelihood that a borrower will default within a time frame. Expressed as a percentage.'],
            ['Loss Given Default (LGD)', 'bi-shield-exclamation', 'text-warning', 'The percentage of exposure that will be lost if default occurs. Considers recovery & collateral.'],
            ['Exposure at Default (EAD)', 'bi-bar-chart-line', 'text-primary', 'The total amount exposed to loss at default. Includes drawn/undrawn amounts.']
          ].map(([title, icon, color, desc], idx) => (
            <div className="col-md-4" key={idx}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <i className={`bi ${icon} ${color}`}></i>
                    <strong>{title}</strong>
                  </div>
                  <p className="text-muted">{desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ECL Formula */}
        <div className="card border-primary bg-light mb-5">
          <div className="card-body text-center">
            <h4 className="text-primary">ECL Calculation Formula</h4>
            <p className="text-muted">The fundamental equation for Expected Credit Loss</p>
            <div className="bg-white p-4 rounded border mt-3">
              <h3 className="font-monospace fw-bold mb-3">ECL = PD × LGD × EAD</h3>
              <p className="text-muted">Expected Credit Loss equals Probability of Default × Loss Given Default × Exposure at Default</p>
            </div>
          </div>
        </div>

        {/* IFRS 9 Stages */}
        <h4 className="text-center fw-bold mb-4">IFRS 9 Three-Stage Approach</h4>
        <div className="row g-4 mb-5">
          {[
            ['Stage 1: Performing', '12-Month ECL', 'success', [
              'No significant credit deterioration',
              'Low credit risk',
              'Calculate 12-month expected losses',
              'Regular monitoring required'
            ]],
            ['Stage 2: Underperforming', 'Lifetime ECL', 'warning', [
              'Significant credit deterioration',
              'Still performing contractually',
              'Calculate lifetime expected losses',
              'Enhanced monitoring'
            ]],
            ['Stage 3: Non-Performing', 'Credit Impaired', 'danger', [
              'Objective evidence of impairment',
              'Default has occurred',
              'Calculate lifetime ECL on net basis',
              'Active recovery management'
            ]]
          ].map(([title, badge, color, points], i) => (
            <div className="col-md-4" key={i}>
              <div className={`card border-${color} bg-${color}-subtle`}>
                <div className="card-body">
                  <h5 className={`text-${color}`}>{title}</h5>
                  <span className={`badge bg-light text-${color} border border-${color} mb-2`}>{badge}</span>
                  <ul className={`text-${color} ps-3`}>
                    {points.map((p, idx) => <li key={idx}>{p}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <h4 className="text-center fw-bold mb-4">Benefits of ECL Implementation</h4>
        <div className="row g-4 mb-5 text-center">
          {[
            ['Risk Management', 'Enhanced credit risk assessment', 'bi-shield-check'],
            ['Compliance', 'IFRS 9 adherence', 'bi-book'],
            ['Capital Optimization', 'Better provisioning strategies', 'bi-bar-chart'],
            ['Decision Making', 'Data-driven lending decisions', 'bi-graph-up']
          ].map(([title, desc, icon], i) => (
            <div className="col-md-3" key={i}>
              <div className="rounded-circle bg-success-subtle d-flex justify-content-center align-items-center mx-auto mb-3" style={{ width: 64, height: 64 }}>
                <i className={`bi ${icon} text-success fs-4`}></i>
              </div>
              <h6 className="text-success fw-semibold mb-1">{title}</h6>
              <p className="text-muted small">{desc}</p>
            </div>
          ))}
        </div>

        {/* Footer Warning */}
        <div className="text-center">
          <div className="alert alert-warning d-inline-flex align-items-center gap-2 justify-content-center mb-3">
            <i className="bi bi-exclamation-triangle text-warning"></i>
            <span>
              This implementation requires careful consideration of regulatory requirements and institutional risk appetite.
            </span>
          </div>
          <p className="text-muted small">
            Expected Credit Loss calculation is a complex process that should be implemented with proper governance,
            validation, and ongoing monitoring.
          </p>
        </div>
      </div>
    </div>
  )
}

