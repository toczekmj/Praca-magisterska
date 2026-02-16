"use client";

import { GetCsvFileContent } from "@/lib/Bucket/bucket";
import { FileColumns } from "@/lib/Database/Enums/FileColumns";
import { FolderColumns } from "@/lib/Database/Enums/FolderColumns";
import { GetFiles } from "@/lib/Database/Services/FileService";
import { GetFolders } from "@/lib/Database/Services/FolderService";
import { Button, DropdownMenu, Select, Text } from "@radix-ui/themes";
import { Models } from "appwrite";
import { useEffect, useState, useMemo } from "react";
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, ReferenceLine, Brush } from "recharts";

export default function Charts() {
  const [folders, setFolders] = useState<Models.DefaultRow[] | null>(null);
  const [selectedFolderId, setSelectedFolderId] = useState<string>("");

  const [files, setFiles] = useState<Models.DefaultRow[] | null>(null);
  const [selectedFileId, setSelectedFileId] = useState<string>("");

  const [csvData, setCsvData] = useState<{ freq: number; mag: number }[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  async function getGenres() {
    const folders = await GetFolders();
    setFolders(folders);
  }

  async function getFilesFromDb() {
    if (!selectedFolderId) return;
    const files = await GetFiles(selectedFolderId);
    console.log(files);
    setFiles(files);
  }  
  
  async function GetFromBucket() {    
    setError(null);
    setLoading(true);
    try {
      const csvid = files?.find((f) => f[FileColumns.ID] === selectedFileId)?.[FileColumns.CsvDataFileID];
      const csv = await GetCsvFileContent(csvid);
      console.log(csv)
      setError(null);
      setCsvData(csv);  
    } catch (err: any) {
      setError(err.message || "Failed to fetch CSV file");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getGenres();
  }, []);
  useEffect(() => {
    getFilesFromDb();
  }, [selectedFolderId]);

  // Transform CSV data for Recharts and optimize for large datasets
  const chartData = useMemo(() => csvData ?? [], [csvData]);

  return (
    <div className="flex flex-col gap-3 px-3">
      {folders ? (
        <>
          <Select.Root
            value={selectedFolderId}
            onValueChange={(val) => setSelectedFolderId(val)}
          >
            <Select.Trigger placeholder="Pick a folder" />
            <Select.Content position="popper">
              {folders.map((folder) => (
                <Select.Group key={folder[FolderColumns.ID]}>
                  <Select.Item value={folder[FolderColumns.ID]}>
                    {folder[FolderColumns.ReadableName]}
                  </Select.Item>
                </Select.Group>
              ))}
            </Select.Content>
          </Select.Root>
        </>
      ) : (
        <></>
      )}

      {files ? (
        <>
          <Select.Root
            value={selectedFileId}
            onValueChange={(val) => setSelectedFileId(val)}
          >
            <Select.Trigger placeholder="Pick a folder" />
            <Select.Content position="popper">
              {files.map((file) => (
                <Select.Group key={file[FileColumns.ID]}>
                  <Select.Item value={file[FileColumns.ID]}>
                    {file[FileColumns.FileName]}
                    {file[FileColumns.CsvDataFileID] ? "" : " (CSV not ready)"}
                  </Select.Item>
                </Select.Group>
              ))}
            </Select.Content>
          </Select.Root>
        </>
      ) : (
        <></>
      )}

      {selectedFileId ? (
        <div className="flex flex-col gap-2">
          <Text size="5">
            Selected: {selectedFileId}
          </Text>
          {files?.find((f) => f[FileColumns.ID] === selectedFileId)?.[FileColumns.CsvDataFileID] ? (
            <>
              <Button variant="outline" onClick={() => GetFromBucket()} disabled={loading}>
                {loading ? "Loading..." : "Get CSV data"}
              </Button>
              {error && (
                <Text size="2" color="red">{error}</Text>
              )}
            </>
          ) : (
            <Text size="2" color="gray">CSV not ready — run FFT processing first.</Text>
          )}
        </div>
      ) : null}

      <div className="flex w-full h-full">
        <BarChart width={10000} height={600} responsive data={chartData}>
          <XAxis dataKey="freq" />
          <YAxis width="auto" />
          <Bar dataKey="mag" fill="#8884d8" />
        </BarChart>

      </div>
    </div>
  );
}
