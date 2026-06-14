# JVK Auto Service & Sales Static Redesign

This is a multi-page static site for JVK Auto Service & Sales.

## Pages
- `index.html` — home page with huge cross-screen monthly deal banner placeholder
- `services.html` — auto repair services and AutoLeap booking CTA
- `deals.html` — coupons/specials page with the same large promo-banner slot
- `used-vehicles.html` — routes customers to the existing Carsforsale inventory, financing, trade-in, and test-drive flows
- `uhaul.html` — U-Haul Neighborhood Dealer landing page
- Contact is now a site-wide modal opened from the header. `contact.html` redirects to `index.html#contact` as a fallback.

## External systems linked
- AutoLeap booking: https://app.myautoleap.com/#/customer-appointment-request/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OTcyMjExMGQ3MjU5MDAyMzI1OGYyYyIsImNvbXBhbnlJZCI6IjY3OTcyYWI2NTU4YjNjYWY5YjdjZDY1YSIsInNob3BJZCI6IjY3OTcyYWI2NTU4YjNjYWY5YjdjZDY2YyIsImlzQ29uc3VtZXIiOnRydWUsImlhdCI6MTczODg3MzMyNn0.xbHKh1FTRKF09D29kLP2rGA5WZ_JU78QvMjMRIlIIWc?trackingId=
- Carsforsale inventory: https://www.jvkautos.com/cars-for-sale
- Carsforsale financing: https://www.jvkautos.com/loan-application
- Carsforsale trade-in: https://www.jvkautos.com/value-my-trade
- Carsforsale test drive: https://www.jvkautos.com/schedule-test-drive
- U-Haul dealer page: https://www.uhaul.com/Locations/Truck-Rentals-near-Derry-NH-03038/037572/

## Deployment
Upload the contents of this folder to the Nginx web root, usually:

```bash
sudo mkdir -p /var/www/jvkautorepair.com
sudo rsync -av ./ /var/www/jvkautorepair.com/
sudo chown -R www-data:www-data /var/www/jvkautorepair.com
sudo nginx -t && sudo systemctl reload nginx
```

Then run Certbot if needed:

```bash
sudo certbot --nginx -d jvkautorepair.com -d www.jvkautorepair.com
```


## June update: banner + direct customer routing

The homepage now uses the downloaded banner image:

- `assets/0326-home-marquee.webp`

The four primary homepage links are:

1. Book Auto Service → AutoLeap scheduler
2. Reserve U-Haul → JVK official U-Haul location page
3. JVK Auto Sales → `https://www.jvkautos.com/`
4. View Services → `services.html`

Recommended Nginx convenience redirects:

```nginx
location = /uhaul {
    return 302 https://www.uhaul.com/Locations/Truck-Rentals-near-Derry-NH-03038/037572/;
}

location = /book-service {
    return 302 https://app.myautoleap.com/#/customer-appointment-request/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OTcyMjExMGQ3MjU5MDAyMzI1OGYyYyIsImNvbXBhbnlJZCI6IjY3OTcyYWI2NTU4YjNjYWY5YjdjZDY1YSIsInNob3BJZCI6IjY3OTcyYWI2NTU4YjNjYWY5YjdjZDY2YyIsImlzQ29uc3VtZXIiOnRydWUsImlhdCI6MTczODg3MzMyNn0.xbHKh1FTRKF09D29kLP2rGA5WZ_JU78QvMjMRIlIIWc?trackingId=;
}

location = /autos {
    return 302 https://www.jvkautos.com/;
}
```

Use 302 while testing; change to 301 after the customer approves.


## Latest tightening notes
- Header CTAs now use vibrant button styling.
- Browse Used Cars goes directly to `https://www.jvkautos.com/cars-for-sale`.
- U-Haul goes directly to JVK's official U-Haul location page.
- Book Service goes directly to the AutoLeap scheduler.
- Homepage includes a four-card five-star reviews section.
- Light theme is enforced in `styles.css` overrides at the bottom of the file.
