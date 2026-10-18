// Turns a static .shutter into real slats. Each slat carries a clipped copy
// of the painted lettering, so the sign breaks apart naturally as it rolls.

export function buildShutter(shutter, count = 12) {
  const paint = shutter.querySelector('.shutter__paint');
  const curtain = document.createElement('div');
  curtain.className = 'shutter__curtain';
  curtain.style.setProperty('--n', count);

  const slats = Array.from({ length: count }, (_, i) => {
    const slat = document.createElement('div');
    slat.className = 'shutter__slat';
    slat.style.setProperty('--i', i);
    slat.append(paint.cloneNode(true));
    curtain.append(slat);
    return slat;
  });

  const rail = document.createElement('div');
  rail.className = 'shutter__rail';
  curtain.append(rail);

  shutter.append(curtain);
  shutter.classList.add('is-built');
  return { curtain, slats };
}
