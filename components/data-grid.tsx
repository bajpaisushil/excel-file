"use client";

import React, { useState } from "react";
import { ArrowLeft, Search, Filter, ArrowDownUp, Download, Share2, Trash2, Plus, ChevronRight, Sparkles, User, Menu, Rows3, Columns3 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  PlayIcon,
  InputIcon,
  ActionIcon,
  EnrichIcon,
  WarningIcon,
  TableIcon,
  PuzzleIcon,
  HistoryIcon,
} from "./icons";
import type { GridData, GridColumn, GridRow } from "../types/grid";
import { exportToExcel } from "../utils/excel";

export default function DataGrid() {
  const [data, setData] = useState<GridData>({
    columns: [
      { id: "input", title: "Input Column", type: "input" },
      { id: "action", title: "Action column", type: "action" },
      { id: "enrich", title: "Enrich Company", type: "enrich" },
    ],
    rows: [
      {
        id: "row-1",
        timestamp: "Oct 12, 2024 at 14:08 PM",
        cells: {
          input: "Bitscale Evaluation - Account relevancy check",
          action: "Bitscale Evaluation - Account relevancy check",
          enrich: "Bitscale Evaluation - Account relevancy check",
        },
      },
      {
        id: "row-2",
        timestamp: "Oct 12, 2024 at 14:08 PM",
        cells: {
          input: "cell data size exceeds limit",
          action: "BMW Evaluation - Relevancy check",
          enrich: "BMW Evaluation - Relevancy check",
        },
        warning: true,
      },
      {
        id: "row-3",
        timestamp: "Oct 12, 2024 at 14:08 PM",
        cells: {
          input: "https://www.linkedin.com/bitscale",
          action: "Google Evaluation - Lilevancy check",
          enrich: "Google Evaluation - Lilevancy check",
        },
        link: true,
      },
      {
        id: "row-4",
        timestamp: "Oct 12, 2024 at 14:08 PM",
        cells: {
          input: "",
          action: "Apple Evaluation - Olvancy check",
          enrich: "Apple Evaluation - Olvancy check",
        },
      },
      {
        id: "row-5",
        timestamp: "Oct 12, 2024 at 14:08 PM",
        cells: {
          input: "",
          action: "Figma Evaluation - Evancy check",
          enrich: "Figma Evaluation - Evancy check",
        },
      },
    ],
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [fileName, setFileName]=useState("");

  const addRow = () => {
    setData((prev) => ({
      ...prev,
      rows: [
        ...prev.rows,
        {
          id: `row-${prev.rows.length + 1}`,
          timestamp: new Date().toLocaleString(),
          cells: Object.fromEntries(prev.columns.map((col) => [col.id, ""])),
        },
      ],
    }));
  };

  const addColumn = () => {
    const newColId = `col-${data.columns.length + 1}`;
    setData((prev) => ({
      columns: [...prev.columns, { id: newColId, title: "", type: "input" }],
      rows: prev.rows.map((row) => ({
        ...row,
        cells: { ...row.cells, [newColId]: "" },
      })),
    }));
  };

  const updateCellValue = (rowId: string, columnId: string, value: string) => {
    setData((prev) => ({
      ...prev,
      rows: prev.rows.map((row) =>
        row.id === rowId
          ? { ...row, cells: { ...row.cells, [columnId]: value } }
          : row
      ),
    }));
  };

  const updateColumnTitle = (columnId: string, title: string) => {
    setData((prev) => ({
      ...prev,
      columns: prev.columns.map((col) =>
        col.id === columnId ? { ...col, title } : col
      ),
    }));
  };

  const deleteRow = (rowId: string) => {
    setData((prev) => ({
      ...prev,
      rows: prev.rows.filter((row) => row.id !== rowId),
    }));
  };

  const handleDownload=(e: React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault();
    if(!fileName){
      alert("File Name if mandatory to download file!");
      return;
    }
    exportToExcel(data, fileName);
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-2 bg-white border-b">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-gray-500 md:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <Menu className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-black hidden md:inline-flex">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <input className="text-sm focus:ring-0 border-0 font-normal" placeholder="Name of the file" value={fileName} onChange={(e)=> setFileName(e.target.value)} />
        </div>
        <div className="flex gap-4 items-center justify-center">
          <div className="flex items-center gap-2">
            <Switch 
              id="auto-save"
              className="bg-gray-200 border border-emerald-400 data-[state=unchecked]:bg-gray-200 data-[state=checked]:bg-emerald-500"
            />
            <label htmlFor="auto-save" className="text-sm text-emerald-500 font-semibold hidden sm:inline-block">
              Auto Save
            </label>
          </div>
          <div className="">
            <User className="w-4 text-red-600" />
          </div>
        </div>
      </header>

      {/* Grid with sidebar */}
      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <div className={`w-16 bg-white border-r absolute md:relative inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition duration-200 ease-in-out z-10`}>
          <div className="flex flex-col items-center p-4 gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
              <TableIcon />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
              <PuzzleIcon />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
              <HistoryIcon />
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto">
          <div className="min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white border-b">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-center w-full sm:w-auto">
                  <div className="w-ful lg:w-[500px] mb-2 sm:mb-0 sm:mr-4">
                    <div className="relative w-full">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                      <Input placeholder="Search" className="pl-8 bg-white w-full border border-gray-300" />
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500 w-full sm:w-aut">
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      <Rows3 className="w-5" />
                      <span>{data.rows.length}/5 Row</span>
                    </div>
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      <Columns3 className="w-5" />
                      <span>{data.columns.length}/3 Column</span>
                    </div>
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      <Filter className="h-4 w-4" />
                      <span>0 Filter</span>
                    </div>
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      <ArrowDownUp className="h-4 w-4" />
                      <span>Sort</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                  <Button className="bg-[#1C2834] hover:bg-[#2C3844] text-white flex items-center justify-center">
                    <Sparkles className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Enrich</span>
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8 border-0">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8 border-0" onClick={(e)=> handleDownload(e)}>
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8 border-0">
                    <Trash2 className="h-4 w-4" color="red" />
                  </Button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="w-12 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-white">
                        #
                      </th>
                      {data.columns.map((column, index) => (
                        <th
                          key={column.id}
                          className={`px-4 py-3 text-left ${
                            index === 0 ? "bg-[#FFF8E7]" : "bg-white"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {index === 0 && <InputIcon />}
                            {index === 1 && <ActionIcon />}
                            {index === 2 && <EnrichIcon />}
                            <Input
                              value={column.title}
                              onChange={(e) =>
                                updateColumnTitle(column.id, e.target.value)
                              }
                              className="text-sm font-medium bg-transparent border-none p-0 focus-visible:ring-0"
                              placeholder="Enter column name"
                            />
                          </div>
                        </th>
                      ))}
                      <th className="w-12 px-4 py-3 bg-white">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={addColumn}
                          className="h-6 w-6"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.rows.map((row, rowIndex) => (
                      <tr key={row.id} className="hover:bg-gray-50 group">
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <PlayIcon />
                            <span className="text-sm text-gray-500">
                              {rowIndex + 1}
                            </span>
                          </div>
                        </td>
                        {data.columns.map((column) => (
                          <td
                            key={`${row.id}-${column.id}`}
                            className="px-4 py-3 whitespace-nowrap"
                          >
                            <div className="flex items-center gap-2 text-sm">
                              {row.warning && column.id === "input" && (
                                <WarningIcon />
                              )}
                              {row.link && column.id === "input" && (
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                >
                                  <path d="M6 8h4M8 6v4" stroke="currentColor" />
                                </svg>
                              )}
                              <Input
                                value={row.cells[column.id]}
                                onChange={(e) =>
                                  updateCellValue(
                                    row.id,
                                    column.id,
                                    e.target.value
                                  )
                                }
                                className={`bg-transparent border-none p-0 focus-visible:ring-0 ${
                                  row.link && column.id === "input"
                                    ? "text-blue-500 underline"
                                    : ""
                                }`}
                              />
                            </div>
                          </td>
                        ))}
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteRow(row.id)}
                              className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                          </div>
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={data.columns.length + 2}>
                        <Button
                          variant="ghost"
                          className="w-full h-12 hover:bg-gray-50"
                          onClick={addRow}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Row
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

