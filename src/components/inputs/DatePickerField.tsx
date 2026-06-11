import React, { useState } from "react";
import { Controller } from "react-hook-form";
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Input, { InputProps } from "./Input";
import { useTheme } from "@/theme";

interface DatePickerFieldProps extends Omit<InputProps, "error" | "value" | "onChangeText"> {
  control: any;
  name: string;
}

const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

//
// Date picker field with modal-based date picker
// Works consistently across all platforms (iOS/Android)
// Stores and displays date in YYYY-MM-DD format
//
export const DatePickerField: React.FC<DatePickerFieldProps> = ({
  control,
  name,
  label,
  ...props
}) => {
  const { colors, spacing, radius, typography } = useTheme();
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());

  const handleOpenDatePicker = (currentValue: string) => {
    if (currentValue) {
      const [year, month, day] = currentValue.split("-").map(Number);
      setSelectedYear(year);
      setSelectedMonth(month - 1);
      setSelectedDay(day);
    } else {
      const today = new Date();
      setSelectedYear(today.getFullYear());
      setSelectedMonth(today.getMonth());
      setSelectedDay(today.getDate());
    }
    setIsPickerVisible(true);
  };

  const handleConfirmDate = (onChange: (value: string) => void) => {
    const selected = new Date(selectedYear, selectedMonth, selectedDay);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Validasi: tidak boleh pilih tanggal yang sudah lewat
    if (selected < today) {
      return;
    }

    const formattedDate = selected.toISOString().split("T")[0];
    onChange(formattedDate);
    setIsPickerVisible(false);
  };

  const handleCancel = () => {
    setIsPickerVisible(false);
  };

  const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() + i);

  // Validasi apakah selected date sudah lewat
  const selectedDate = new Date(selectedYear, selectedMonth, selectedDay);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isDateValid = selectedDate >= today;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <>
          <Pressable
            onPress={() => handleOpenDatePicker(value)}
            style={styles.container}
          >
            <Text
              style={[
                styles.label,
                {
                  color: colors.textSecondary,
                  marginBottom: spacing.xs,
                  fontSize: typography.bodySmall - 1,
                },
              ]}
            >
              {label}
            </Text>

            <View
              style={[
                styles.inputContainer,
                {
                  backgroundColor: colors.card,
                  borderColor: error ? colors.danger : colors.border,
                  borderRadius: radius.md,
                  paddingVertical: spacing.md - 4,
                  paddingHorizontal: spacing.md,
                },
              ]}
            >
              <Text
                style={[
                  styles.dateText,
                  {
                    color: value ? colors.textPrimary : colors.textSecondary + "80",
                    fontSize: typography.bodySmall,
                  },
                ]}
              >
                {value || "Pilih tanggal"}
              </Text>

              <Ionicons name="calendar" size={20} color={colors.primary} />
            </View>

            {error && (
              <Text
                style={[
                  styles.error,
                  {
                    color: colors.danger,
                    marginTop: spacing.xs,
                    fontSize: typography.caption,
                  },
                ]}
              >
                {error.message}
              </Text>
            )}
          </Pressable>

          {/* Date Picker Modal */}
          <Modal visible={isPickerVisible} transparent animationType="fade">
            <Pressable
              style={[styles.modalOverlay, { backgroundColor: "rgba(0,0,0,0.5)" }]}
              onPress={handleCancel}
            >
              <View
                style={[
                  styles.modalContent,
                  {
                    backgroundColor: colors.card,
                    borderRadius: radius.lg,
                  },
                ]}
              >
                {/* Header */}
                <View
                  style={[
                    styles.modalHeader,
                    {
                      borderBottomColor: colors.border,
                    },
                  ]}
                >
                  <Pressable onPress={handleCancel}>
                    <Text style={[styles.headerButton, { color: colors.danger }]}>
                      Batal
                    </Text>
                  </Pressable>

                  <Text
                    style={[
                      styles.headerTitle,
                      {
                        color: colors.textPrimary,
                        fontSize: typography.h3,
                      },
                    ]}
                  >
                    Pilih Tanggal
                  </Text>

                  <Pressable
                    disabled={!isDateValid}
                    onPress={() => handleConfirmDate(onChange)}
                  >
                    <Text
                      style={[
                        styles.headerButton,
                        {
                          color: isDateValid ? colors.primary : colors.border,
                        },
                      ]}
                    >
                      Pilih
                    </Text>
                  </Pressable>
                </View>

                {/* Picker Wheels */}
                <View style={styles.pickerContainer}>
                  {/* Day */}
                  <ScrollView
                    style={styles.wheel}
                    snapToInterval={40}
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={false}
                  >
                    {days.map((day) => (
                      <Pressable
                        key={day}
                        onPress={() => setSelectedDay(day)}
                        style={styles.wheelItem}
                      >
                        <Text
                          style={[
                            styles.wheelItemText,
                            {
                              color:
                                selectedDay === day ? colors.primary : colors.textSecondary,
                              fontWeight: selectedDay === day ? "700" : "500",
                              fontSize: typography.bodySmall,
                            },
                          ]}
                        >
                          {String(day).padStart(2, "0")}
                        </Text>
                      </Pressable>
                    ))}
                  </ScrollView>

                  {/* Month */}
                  <ScrollView
                    style={styles.wheel}
                    snapToInterval={40}
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={false}
                  >
                    {months.map((month, idx) => (
                      <Pressable
                        key={month}
                        onPress={() => setSelectedMonth(idx)}
                        style={styles.wheelItem}
                      >
                        <Text
                          style={[
                            styles.wheelItemText,
                            {
                              color:
                                selectedMonth === idx ? colors.primary : colors.textSecondary,
                              fontWeight: selectedMonth === idx ? "700" : "500",
                              fontSize: typography.bodySmall,
                            },
                          ]}
                        >
                          {month}
                        </Text>
                      </Pressable>
                    ))}
                  </ScrollView>

                  {/* Year */}
                  <ScrollView
                    style={styles.wheel}
                    snapToInterval={40}
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={false}
                  >
                    {years.map((year) => (
                      <Pressable
                        key={year}
                        onPress={() => setSelectedYear(year)}
                        style={styles.wheelItem}
                      >
                        <Text
                          style={[
                            styles.wheelItemText,
                            {
                              color:
                                selectedYear === year ? colors.primary : colors.textSecondary,
                              fontWeight: selectedYear === year ? "700" : "500",
                              fontSize: typography.bodySmall,
                            },
                          ]}
                        >
                          {year}
                        </Text>
                      </Pressable>
                    ))}
                  </ScrollView>
                </View>

                {/* Info Text */}
                {!isDateValid && (
                  <Text
                    style={[
                      styles.infoText,
                      {
                        color: colors.danger,
                        fontSize: typography.caption,
                      },
                    ]}
                  >
                    Tanggal tidak boleh sebelum hari ini
                  </Text>
                )}
              </View>
            </Pressable>
          </Modal>
        </>
      )}
    />
  );
};

export default DatePickerField;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 14,
  },
  label: {
    fontWeight: "600",
  },
  inputContainer: {
    borderWidth: 1.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateText: {
    flex: 1,
    fontWeight: "500",
  },
  error: {
    fontWeight: "500",
    marginTop: 6,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 32,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  headerButton: {
    fontSize: 14,
    fontWeight: "600",
  },
  headerTitle: {
    fontWeight: "700",
  },
  pickerContainer: {
    flexDirection: "row",
    height: 200,
    paddingVertical: 12,
  },
  wheel: {
    flex: 1,
  },
  wheelItem: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  wheelItemText: {
    textAlign: "center",
  },
  infoText: {
    textAlign: "center",
    paddingHorizontal: 16,
    paddingTop: 12,
    fontWeight: "500",
  },
});
