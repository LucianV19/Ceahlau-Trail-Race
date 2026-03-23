export default function Rules() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-tight">Regulament</h1>
          <p className="text-xl text-slate-300">
            Regulamentul oficial al competiției Ceahlău Trail Race.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12 prose prose-slate max-w-none">
          <h2>1. Condiții de Participare</h2>
          <p>
            Competiția este deschisă oricărei persoane care a împlinit vârsta de 18 ani până la data desfășurării evenimentului și care este aptă din punct de vedere medical pentru efort fizic prelungit (alergare montană).
          </p>
          <p>
            Pentru cursa de Cros (12km), este permisă participarea minorilor cu vârsta de peste 16 ani, doar cu acordul scris al părinților sau al tutorelui legal.
          </p>

          <h2>2. Echipament Obligatoriu</h2>
          <p>
            Pentru siguranța concurenților, următorul echipament este obligatoriu pe toată durata cursei (Semimaraton și Maraton):
          </p>
          <ul>
            <li>Încălțăminte cu profil montan (trail running)</li>
            <li>Recipient pentru apă (minim 0.5L)</li>
            <li>Folie de supraviețuire</li>
            <li>Telefon mobil cu bateria încărcată</li>
            <li>Jachetă impermeabilă (în funcție de condițiile meteo)</li>
            <li>Numărul de concurs (furnizat de organizatori), purtat la vedere</li>
          </ul>

          <h2>3. Traseu și Marcaje</h2>
          <p>
            Traseele sunt marcate cu bandă de semnalizare și indicatoare specifice competiției. Este strict interzisă părăsirea traseului marcat sau scurtarea acestuia. Orice abatere va fi sancționată cu descalificarea.
          </p>

          <h2>4. Timpi Limită</h2>
          <p>
            Există timpi limită (cut-off times) pentru fiecare cursă și pentru anumite puncte de control de pe traseu. Concurenții care nu se încadrează în acești timpi vor fi opriți din cursă și direcționați către zona de sosire pe rute de retragere.
          </p>

          <h2>5. Protecția Mediului</h2>
          <p>
            Competiția se desfășoară în Parcul Național Ceahlău. Este strict interzisă aruncarea oricăror deșeuri (ambalaje de geluri, sticle etc.) pe traseu. Deșeurile pot fi lăsate doar la punctele de alimentare. Nerespectarea acestei reguli atrage descalificarea imediată.
          </p>
        </div>
      </div>
    </div>
  );
}
