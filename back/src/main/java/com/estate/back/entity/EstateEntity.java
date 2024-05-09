package com.estate.back.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name="estate")
@Table(name="estate")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EstateEntity {
  private Integer sequence;
}
