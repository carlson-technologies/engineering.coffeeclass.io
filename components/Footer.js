import React from 'react'
import year from '../lib/current_date'

export default function Footer() {
    return (
        <div className="footer-wrapper">
            <small style={{ color: 'gray' }}>&copy; Copyright {year}, Carlson Technologies LLC. All Rights Reserved.</small>
        </div>
    )
}
