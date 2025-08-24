import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Legal = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Información legal
              </h1>
              <p className="text-xl text-muted-foreground">
                Términos, riesgos y políticas que rigen el uso de VCoin
              </p>
            </div>

            <Tabs defaultValue="terms" className="w-full max-w-6xl mx-auto">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="terms">Términos</TabsTrigger>
                <TabsTrigger value="risks">Riesgos</TabsTrigger>
                <TabsTrigger value="privacy">Privacidad</TabsTrigger>
                <TabsTrigger value="cookies">Cookies</TabsTrigger>
              </TabsList>
              
              <TabsContent value="terms" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Términos y Condiciones de Uso</CardTitle>
                    <p className="text-sm text-muted-foreground">Última actualización: Diciembre 2024</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">1. Aceptación de términos</h3>
                      <p className="text-muted-foreground">
                        Al acceder y utilizar la plataforma VCoin, usted acepta estar sujeto a estos términos y condiciones. 
                        Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestros servicios.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3">2. Descripción del servicio</h3>
                      <p className="text-muted-foreground">
                        VCoin es una plataforma que facilita la conexión entre inversores y emprendedores a través de 
                        un modelo de financiación híbrida (cash + token). No somos un banco, corredor de valores o 
                        asesor de inversiones registrado.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3">3. Elegibilidad y KYC</h3>
                      <p className="text-muted-foreground">
                        Para utilizar nuestros servicios, debe ser mayor de edad en su jurisdicción y cumplir con 
                        nuestros procesos de verificación KYC/AML. Nos reservamos el derecho de rechazar el servicio 
                        a cualquier persona por cualquier motivo.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3">4. Naturaleza del token VCOIN</h3>
                      <p className="text-muted-foreground">
                        VCOIN es un token de utilidad diseñado para facilitar las interacciones dentro de nuestra plataforma. 
                        No representa una participación accionarial, deuda o derecho a dividendos en nuestra empresa o en 
                        los proyectos financiados.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3">5. Riesgos de inversión</h3>
                      <p className="text-muted-foreground">
                        Las inversiones en proyectos a través de nuestra plataforma conllevan riesgos significativos, 
                        incluida la pérdida total del capital invertido. Los proyectos pueden no alcanzar sus objetivos 
                        o pueden fallar completamente.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3">6. Limitación de responsabilidad</h3>
                      <p className="text-muted-foreground">
                        En ningún caso seremos responsables de daños directos, indirectos, incidentales o consecuentes 
                        que resulten del uso de nuestra plataforma o de las inversiones realizadas a través de ella.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3">7. Modificaciones</h3>
                      <p className="text-muted-foreground">
                        Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones 
                        entrarán en vigor inmediatamente después de su publicación en la plataforma.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="risks" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Declaración de Riesgos</CardTitle>
                    <p className="text-sm text-muted-foreground">Información obligatoria sobre riesgos de inversión</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                      <h3 className="text-lg font-semibold mb-3 text-red-600 dark:text-red-400">
                        ⚠️ Advertencia principal
                      </h3>
                      <p className="text-sm">
                        Invertir en startups y proyectos en fase temprana es altamente especulativo y conlleva 
                        un alto riesgo de pérdida. Puede perder toda su inversión.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Riesgos específicos</h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Riesgo de pérdida total</h4>
                          <p className="text-muted-foreground text-sm">
                            Los proyectos en fase temprana tienen una alta tasa de fracaso. Existe una posibilidad 
                            significativa de que pierda toda su inversión.
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2">Falta de liquidez</h4>
                          <p className="text-muted-foreground text-sm">
                            Las inversiones en proyectos privados son ilíquidas. Puede que no pueda vender 
                            su participación cuando lo desee.
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2">Volatilidad del token VCOIN</h4>
                          <p className="text-muted-foreground text-sm">
                            El valor de VCOIN puede fluctuar significativamente, afectando su poder de inversión 
                            y el valor de sus tenencias.
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2">Riesgo regulatorio</h4>
                          <p className="text-muted-foreground text-sm">
                            Los cambios en la regulación pueden afectar la disponibilidad de la plataforma 
                            o la naturaleza de las inversiones ofrecidas.
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2">Riesgo tecnológico</h4>
                          <p className="text-muted-foreground text-sm">
                            La plataforma depende de tecnología blockchain que puede tener fallos, hackeos 
                            o cambios que afecten su funcionamiento.
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2">Información limitada</h4>
                          <p className="text-muted-foreground text-sm">
                            Los proyectos pueden proporcionar información limitada o incompleta, dificultando 
                            la evaluación adecuada de la inversión.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Recomendaciones</h3>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm">
                        <li>Solo invierta dinero que pueda permitirse perder</li>
                        <li>Diversifique sus inversiones</li>
                        <li>Realice su propia investigación (DYOR)</li>
                        <li>Consulte con un asesor financiero independiente</li>
                        <li>Lea toda la documentación del proyecto antes de invertir</li>
                        <li>Comprenda las reglas de excedente antes de invertir</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="privacy" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Política de Privacidad</CardTitle>
                    <p className="text-sm text-muted-foreground">Cómo recopilamos, usamos y protegemos sus datos</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">1. Información que recopilamos</h3>
                      <div className="space-y-2 text-muted-foreground">
                        <p><strong>Información de cuenta:</strong> Nombre, email, dirección, documentos de identidad</p>
                        <p><strong>Información financiera:</strong> Historial de transacciones, método de pago</p>
                        <p><strong>Información técnica:</strong> Dirección IP, tipo de navegador, actividad en la plataforma</p>
                        <p><strong>Información KYC:</strong> Documentos de verificación de identidad según requisitos regulatorios</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3">2. Cómo usamos su información</h3>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>Verificar su identidad y cumplir con requisitos KYC/AML</li>
                        <li>Procesar transacciones e inversiones</li>
                        <li>Comunicarnos con usted sobre su cuenta y actividades</li>
                        <li>Mejorar nuestros servicios y experiencia de usuario</li>
                        <li>Cumplir con obligaciones legales y regulatorias</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3">3. Compartir información</h3>
                      <p className="text-muted-foreground">
                        No vendemos ni alquilamos su información personal. Podemos compartir información con:
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>Proveedores de servicios que nos ayudan a operar la plataforma</li>
                        <li>Autoridades regulatorias cuando sea requerido por ley</li>
                        <li>Partners de verificación KYC/AML</li>
                        <li>Auditores y asesores legales</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3">4. Seguridad de datos</h3>
                      <p className="text-muted-foreground">
                        Implementamos medidas de seguridad técnicas y organizativas para proteger su información, 
                        incluyendo encriptación, firewalls y acceso restringido.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3">5. Sus derechos</h3>
                      <p className="text-muted-foreground">
                        Según el GDPR y otras leyes aplicables, usted tiene derecho a:
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>Acceder a su información personal</li>
                        <li>Rectificar información incorrecta</li>
                        <li>Solicitar la eliminación de sus datos</li>
                        <li>Restringir el procesamiento</li>
                        <li>Portabilidad de datos</li>
                        <li>Objetar al procesamiento</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3">6. Contacto</h3>
                      <p className="text-muted-foreground">
                        Para ejercer sus derechos o hacer preguntas sobre privacidad, contacte: 
                        <span className="font-semibold"> privacy@vcoin.platform</span>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="cookies" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Política de Cookies</CardTitle>
                    <p className="text-sm text-muted-foreground">Cómo utilizamos cookies y tecnologías similares</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">¿Qué son las cookies?</h3>
                      <p className="text-muted-foreground">
                        Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando 
                        visita nuestro sitio web. Nos ayudan a mejorar su experiencia y a entender cómo 
                        utiliza nuestra plataforma.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Tipos de cookies que utilizamos</h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Cookies esenciales</h4>
                          <p className="text-muted-foreground text-sm">
                            Necesarias para el funcionamiento básico del sitio web, como autenticación 
                            y seguridad. No se pueden desactivar.
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2">Cookies analíticas</h4>
                          <p className="text-muted-foreground text-sm">
                            Nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web, 
                            qué páginas son más populares y cómo mejorar la experiencia.
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2">Cookies funcionales</h4>
                          <p className="text-muted-foreground text-sm">
                            Permiten funcionalidades mejoradas como recordar sus preferencias de idioma 
                            o configuraciones de la cuenta.
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2">Cookies de marketing</h4>
                          <p className="text-muted-foreground text-sm">
                            Se utilizan para rastrear visitantes a través de sitios web con el fin de 
                            mostrar anuncios relevantes y efectivos.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Gestionar cookies</h3>
                      <p className="text-muted-foreground">
                        Puede controlar y/o eliminar cookies como desee. Puede eliminar todas las cookies 
                        que ya están en su computadora y puede configurar la mayoría de navegadores para 
                        evitar que se coloquen.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Terceros</h3>
                      <p className="text-muted-foreground">
                        Utilizamos servicios de terceros que pueden establecer sus propias cookies:
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>Google Analytics (analíticas)</li>
                        <li>Hotjar (análisis de comportamiento)</li>
                        <li>Intercom (soporte al cliente)</li>
                        <li>Stripe (procesamiento de pagos)</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Consentimiento</h3>
                      <p className="text-muted-foreground">
                        Al continuar utilizando nuestro sitio web, consiente el uso de cookies según 
                        se describe en esta política. Puede retirar su consentimiento en cualquier momento 
                        modificando la configuración de su navegador.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            {/* Banner de aviso legal */}
            <div className="mt-16 p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2 text-yellow-600 dark:text-yellow-400">
                  Aviso Legal Importante
                </h3>
                <p className="text-sm text-muted-foreground">
                  Invertir implica riesgos. Algunas ofertas pueden estar restringidas por jurisdicción y 
                  perfil de inversor. No es asesoramiento financiero. Esta plataforma no está registrada 
                  como corredor de valores en ninguna jurisdicción.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Legal;