# JVK Auto Service & Sales Static Redesign

This is a multi-page static site for JVK Auto Service & Sales.

## Pages
- `index.html` — home page with the mountain banner and direct customer routing
- `services.html` — auto repair services and AutoLeap booking CTAs
- `deals.html` — coupons/specials page
- `contact.html` — service/sales/U-Haul contact paths plus simple fallback mailto form
- `used-vehicles.html` — instant redirect to live Carsforsale inventory
- `uhaul.html` — instant redirect to the official JVK U-Haul location page

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

The four primary homepage/header links are:

1. Book Auto Service → AutoLeap scheduler, direct one-click external link
2. Reserve U-Haul → JVK official U-Haul location page, direct one-click external link
3. Browse Used Cars → `https://www.jvkautos.com/cars-for-sale`, direct one-click external link
4. View Services → `services.html`

Recommended Nginx convenience redirects:

```nginx
location = /uhaul {
    return 302 https://www.uhaul.com/Locations/Truck-Rentals-near-Derry-NH-03038/037572/;
}

location = /book-service {
    return 302 https://app.myautoleap.com/#/customer-appointment-request/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OTcyMjExMGQ3MjU5MDAyMzI1OGYyYyIsImNvbXBhbnlJZCI6IjY3OTcyYWI2NTU4YjNjYWY5YjdjZDY1YSIsInNob3BJZCI6IjY3OTcyYWI2NTU4YjNjYWY5YjdjZDY2YyIsImlzQ29uc3VtZXIiOnRydWUsImlhdCI6MTczODg3MzMyNn0.xbHKh1FTRKF09D29kLP2rGA5WZ_JU78QvMjMRIlIIWc?trackingId=;
}

location = /used-cars {
    return 302 https://www.jvkautos.com/cars-for-sale;
}

location = /autos {
    return 302 https://www.jvkautos.com/cars-for-sale;
}
```

Use 302 while testing; change to 301 after the customer approves.
