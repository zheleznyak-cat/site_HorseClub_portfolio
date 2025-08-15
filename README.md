<!-- Нажатие на превью ведёт на сайт -->
<a href="https://example.com" target="_blank" rel="noreferrer noopener" style="text-decoration:none;">
  <div style="display:flex; align-items:flex-start; gap:24px; flex-wrap:wrap;">
    <!-- Desktop (лаптоп/монитор) -->
    <svg viewBox="0 0 900 620" width="760" style="max-width:100%; height:auto; display:block;">
      <!-- Тень устройства -->
      <ellipse cx="450" cy="600" rx="260" ry="14" fill="rgba(0,0,0,0.20)"/>
      <!-- Корпус -->
      <rect x="50" y="40" width="800" height="480" rx="22" fill="#0f1115" stroke="#1a1f2b" stroke-width="2"/>
      <!-- Камера/датчик -->
      <circle cx="450" cy="56" r="4" fill="#2b2f3a"/>
      <!-- Экран с округлением через clipPath -->
      <defs>
        <clipPath id="deskScreen">
          <rect x="70" y="60" width="760" height="440" rx="12"/>
        </clipPath>
      </defs>
      <g clip-path="url(#deskScreen)">
        <image href="screenshots/desktop.png" x="70" y="60" width="760" height="440" preserveAspectRatio="xMidYMid slice"/>
      </g>
      <!-- Подставка/ножка -->
      <rect x="400" y="520" width="100" height="18" rx="6" fill="#2a2f3a"/>
      <rect x="320" y="538" width="260" height="14" rx="7" fill="#2a2f3a"/>
    </svg>

    <!-- Phone -->
    <svg viewBox="0 0 320 660" width="260" style="max-width:100%; height:auto; display:block;">
      <!-- Тень -->
      <ellipse cx="160" cy="645" rx="90" ry="10" fill="rgba(0,0,0,0.20)"/>
      <!-- Корпус телефона -->
      <rect x="20" y="20" width="280" height="600" rx="44" fill="#0f1115" stroke="#1a1f2b" stroke-width="2"/>
      <!-- Экран с вырезом -->
      <defs>
        <clipPath id="phoneScreen">
          <rect x="36" y="56" width="248" height="536" rx="30"/>
        </clipPath>
      </defs>
      <!-- Динамик/камеры -->
      <rect x="126" y="34" width="68" height="6" rx="3" fill="#2b2f3a"/>
      <circle cx="210" cy="37" r="4" fill="#2b2f3a"/>
      <g clip-path="url(#phoneScreen)">
        <image href="screenshots/mobile.png" x="36" y="56" width="248" height="536" preserveAspectRatio="xMidYMid slice"/>
      </g>
      <!-- Кнопки на гранях (декор) -->
      <rect x="18" y="160" width="4" height="50" rx="2" fill="#1f2531"/>
      <rect x="298" y="220" width="4" height="38" rx="2" fill="#1f2531"/>
      <rect x="298" y="270" width="4" height="60" rx="2" fill="#1f2531"/>
    </svg>
  </div>
</a>
