POST /VENTAPREPAGOTITULO/VentaPrepagoTitulo.svc?wsdl 
Content-type: text/xml; charset=utf-8
SOAPAction: http://tempuri.org/IVentaPrepagoTitulo/ConsultaSaldoTarjeta1

<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">   <soapenv:Header/>   <soapenv:Body>      <tem:ConsultaSaldoTarjeta1>         <tem:sNumeroTP>mi_codigo_de_tarjeta_aqui</tem:sNumeroTP>         <tem:sLenguaje>es</tem:sLenguaje>         <tem:sTipoApp>APP_SALDO_ANDROID</tem:sTipoApp>      </tem:ConsultaSaldoTarjeta1>   </soapenv:Body></soapenv:Envelope>


mi_codigo_de_tarjeta_aqui = 001000012345

# servicio 
http://www.citram.es:50081/VENTAPREPAGOTITULO/VentaPrepagoTitulo.svc?wsdl


lineas de metro 
# informacion de lineas
POST http://www.citram.es:8080/WSMultimodalInformation/MultimodalInformation.svc HTTP/1.1
Content-type: text/xml; charset=utf-8
SOAPAction: GEIS.MultimodalInfoWebService/MultimodalInformation/GetLines
