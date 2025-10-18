
'use client';

import type { ReportData, ResultRow } from '@/lib/hematology-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Printer, ArrowUp, ArrowDown, FilePlus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';

interface ReportProps {
  data: ReportData;
  onReset: () => void;
}

const ResultTable = ({ results }: { results: ResultRow[] }) => (
    <div className="rounded-md border">
        <Table className="text-xs">
            <TableHeader>
                <TableRow>
                    <TableHead className="font-bold w-[40%] p-2">Parámetro</TableHead>
                    <TableHead className="text-right font-bold p-2">Res.</TableHead>
                    <TableHead className="text-center font-bold p-2">Ind.</TableHead>
                    <TableHead className="text-center font-bold p-2">Referencia</TableHead>
                    <TableHead className="font-bold p-2">Unidad</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {results.map((row) => (
                    <TableRow key={row.parameter} className={row.indicator ? 'bg-destructive/10' : ''}>
                        <TableCell className="font-medium p-2">{row.parameter}</TableCell>
                        <TableCell className="text-right font-mono p-2">{row.result}</TableCell>
                        <TableCell className="text-center px-1 p-2">
                            {row.indicator === '↑' && <ArrowUp className="h-3 w-3 text-destructive inline-block" />}
                            {row.indicator === '↓' && <ArrowDown className="h-3 w-3 text-destructive inline-block" />}
                        </TableCell>
                        <TableCell className="text-center font-mono p-2">{row.range}</TableCell>
                        <TableCell className="whitespace-nowrap p-2">{row.unit}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
);

export default function Report({ data, onReset }: ReportProps) {
  const { patient, results } = data;

  const handlePrint = () => {
    window.print();
  };

  const useTwoColumns = results.length > 12;
  const midPoint = useTwoColumns ? Math.ceil(results.length / 2) : 0;

  return (
    <div className="w-full max-w-4xl">
      <div className="flex justify-end gap-2 mb-4 no-print">
        <Button onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" />
          Imprimir o Guardar como PDF
        </Button>
        <Button variant="outline" onClick={onReset}>
          <FilePlus className="mr-2 h-4 w-4" />
          Generar Nuevo Informe
        </Button>
      </div>

      <Card className="print-container rounded-lg shadow-lg bg-card">
        <CardHeader className="p-4">
            <div className="flex items-start justify-between">
                <div>
                    <CardTitle className="text-2xl font-headline text-card-foreground">MESTIZOS CENTRO VETERINARIO</CardTitle>
                    <CardDescription className="text-base">Informe de Hematología</CardDescription>
                </div>
                <div className="text-right">
                  <Image 
                    src="/logo.png"
                    alt="Logo de la Clínica"
                    width={100} 
                    height={100}
                    className="object-contain"
                    />
                </div>
            </div>
        </CardHeader>
        <CardContent className="p-4">
            <Separator className="my-2" />
            <h3 className="text-base font-semibold mb-2 font-headline">Datos del Paciente</h3>
            <div className="grid grid-cols-3 gap-x-4 gap-y-1 text-xs mb-4 p-2 bg-accent/50 rounded-md">
                <div><strong>ID Muestra:</strong> {patient.id}</div>
                <div><strong>Propietario:</strong> {patient.ownerName}</div>
                <div><strong>Mascota:</strong> {patient.petName}</div>
                <div><strong>Dirección:</strong> {patient.address}</div>
                <div><strong>Especie:</strong> {patient.species}</div>
                <div><strong>Raza:</strong> {patient.race}</div>
                <div><strong>Edad:</strong> {patient.age}</div>
                <div><strong>Sexo:</strong> {patient.sex}</div>
                <div><strong>Fecha:</strong> {patient.date}</div>
            </div>
             <div className="mb-4 text-xs">
                <strong>M.V. que remite:</strong> {patient.vet}
            </div>

            <Separator className="my-2" />
            <h3 className="text-base font-semibold mb-2 font-headline">Resultados</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 print:grid-cols-2 print:gap-x-2">
                {useTwoColumns ? (
                  <>
                    <ResultTable results={results.slice(0, midPoint)} />
                    <ResultTable results={results.slice(midPoint)} />
                  </>
                ) : (
                  <ResultTable results={results} />
                )}
            </div>

            <div className="mt-4 text-xs text-muted-foreground text-center">
                <p>LOS RANGOS DE REFERENCIA DEBEN SER INTERPRETADOS POR UN PROFESIONAL VETERINARIO.</p>
                <p>MESTIZOS CENTRO VETERINARIO - Contacto: (0212) 761-7823</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
